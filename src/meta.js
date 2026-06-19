/**
 * ────────────────────────────────────────────────────────────
 * [ META & SEO CONFIGURATION ]
 * ────────────────────────────────────────────────────────────
 */

export const META = {
    name: 'Abi Bhaskara Mulia',
    eventType: 'Sweet Seventeen',
    date: 'Saturday, 30 Juni 2026',
    shortDate: '30 . 06 . 2026',
    venue: 'Mulia Resort - Nusa Dua',
    dressCode: 'Monochrome Glamour',
    heroImage: 'https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613036/Untitled-3_dvx1p8.webp',
    siteUrl: '', // URL Produksi untuk mengisi og:url
};

// Properti Open Graph
export const OG = {
    title: `You're Invited — ${META.name}'s ${META.eventType}`,
    description: `Join us to celebrate ${META.name}'s ${META.eventType} · ${META.date} · ${META.venue} · Dress Code: ${META.dressCode}`,
    siteName: META.eventType,
    image: META.heroImage,
    imageAlt: `${META.name} — ${META.eventType}`,
    imageWidth: '1200',
    imageHeight: '630',
};
