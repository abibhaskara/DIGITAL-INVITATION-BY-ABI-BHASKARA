const MAX_NAME_LEN = 100;
const MAX_MSG_LEN = 500;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

function errorResponse(message, status = 500) {
    return Response.json({ success: false, error: message }, { status, headers: CORS_HEADERS });
}

async function handleWishes(request, env) {
    const { method } = request;

    if (method === 'OPTIONS') {
        return new Response(null, { headers: CORS_HEADERS });
    }

    try {
        // ⚠️ Ganti "DB" sesuai dengan nama binding database Anda di wrangler.json (jika ada perubahan)
        const db = env.DB;

        if (!db) {
            console.error('Database binding not found. Check wrangler.json binding name.');
            return errorResponse('Database binding not found', 500);
        }

        await db.prepare(`
            CREATE TABLE IF NOT EXISTS wishes (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                name       TEXT    NOT NULL,
                message    TEXT    NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        if (method === 'GET') {
            const { results } = await db
                .prepare('SELECT id, name, message, created_at FROM wishes ORDER BY id DESC')
                .all();
            return Response.json({ success: true, data: results }, { headers: CORS_HEADERS });
        }

        if (method === 'POST') {
            const body = await request.json();
            const name = typeof body.name === 'string' ? body.name.trim() : '';
            const message = typeof body.message === 'string' ? body.message.trim() : '';

            if (!name || !message) {
                return errorResponse('Name and message are required', 400);
            }

            const safeName = name.slice(0, MAX_NAME_LEN);
            const safeMessage = message.slice(0, MAX_MSG_LEN);

            const result = await db
                .prepare('INSERT INTO wishes (name, message) VALUES (?, ?)')
                .bind(safeName, safeMessage)
                .run();

            return Response.json(
                { success: true, data: { id: result.meta.last_row_id, name: safeName, message: safeMessage } },
                { status: 201, headers: CORS_HEADERS }
            );
        }

        if (method === 'DELETE') {
            const id = Number(new URL(request.url).searchParams.get('id'));
            if (!Number.isInteger(id) || id <= 0) {
                return errorResponse('Invalid id', 400);
            }
            await db.prepare('DELETE FROM wishes WHERE id = ?').bind(id).run();
            return Response.json({ success: true, message: 'Wish deleted' }, { headers: CORS_HEADERS });
        }

        return errorResponse('Method not allowed', 405);

    } catch (error) {
        console.error('Worker Error:', error);
        return errorResponse(error.message || 'Internal server error', 500);
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === '/api/wishes') {
            return handleWishes(request, env);
        }

        return env.ASSETS.fetch(request);
    },
};
