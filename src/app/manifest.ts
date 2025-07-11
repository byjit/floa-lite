import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Floa - AI Agent Chat Platform',
    short_name: 'Floa',
    description:
      'Floa is the all-in-one AI Agent Chat Platform for all screens. Switch between AI providers, upload files with RAG, connect tools via MCP, and create AI personas. For professionals, devs, and students.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#2178f9',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    lang: 'en',
    scope: '/',
    categories: [
      'productivity',
      "ai",
    ],
  }
}