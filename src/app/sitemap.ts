import type { MetadataRoute } from 'next'
import { getProducts, getGuides } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aguteobabys.cl'
  const now = new Date()

  const statics: MetadataRoute.Sitemap = [
    { url: BASE,              lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/tienda`,  lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/guias`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const [productsResult, guidesResult] = await Promise.all([
    getProducts({ per_page: 48 }).catch(() => ({ data: [] })),
    getGuides().catch(() => ({ data: [] })),
  ])

  const products: MetadataRoute.Sitemap = productsResult.data.map((p) => ({
    url: `${BASE}/producto/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const guides: MetadataRoute.Sitemap = guidesResult.data.map((g) => ({
    url: `${BASE}/guias/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...statics, ...products, ...guides]
}
