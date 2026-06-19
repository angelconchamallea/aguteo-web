import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aguteobabys.cl'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/compra-exitosa', '/pago-fallido', '/api/', '/design'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
