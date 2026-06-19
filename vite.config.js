import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Import langsung pakai dynamic import dalam plugin (lebih bersih)
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig(async () => {
  // Dynamic import meta.js — berjalan sekali saat vite start/build
  const { OG, META } = await import('./src/meta.js')

  /** Plugin: inject OG meta tags ke index.html via placeholder */
  const injectOgMeta = {
    name: 'inject-og-meta',
    transformIndexHtml(html) {
      return html
        .replace(/__OG_TITLE__/g,        OG.title)
        .replace(/__OG_DESCRIPTION__/g,   OG.description)
        .replace(/__OG_SITE_NAME__/g,     OG.siteName)
        .replace(/__OG_IMAGE__/g,         OG.image)
        .replace(/__OG_IMAGE_ALT__/g,     OG.imageAlt)
        .replace(/__OG_IMAGE_WIDTH__/g,   OG.imageWidth)
        .replace(/__OG_IMAGE_HEIGHT__/g,  OG.imageHeight)
        .replace(/__META_NAME__/g,        META.name)
        .replace(/__META_EVENT_TYPE__/g,  META.eventType)
        .replace(/__META_DATE__/g,        META.date)
        .replace(/__META_VENUE__/g,       META.venue)
        .replace(/__SITE_URL__/g,         META.siteUrl || '')
    }
  }

  return {
    plugins: [react(), injectOgMeta],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8787',
          changeOrigin: true,
        }
      }
    }
  }
})
