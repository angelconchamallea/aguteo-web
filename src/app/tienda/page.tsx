import { getCategories, getAgeStages, getBrands, getProducts } from '@/lib/api'
import SiteHeader from '@/components/home/SiteHeader'
import CategoryBar from '@/components/home/CategoryBar'
import SiteFooter from '@/components/home/SiteFooter'
import ShopShell from '@/components/shop/ShopShell'
import type { CurrentFilters } from '@/components/shop/ShopShell'

export const revalidate = 300

interface TiendaPageProps {
  searchParams: Promise<{
    category?: string
    stage?: string
    brand?: string
    min_price?: string
    max_price?: string
    sort?: string
    page?: string
    search?: string
  }>
}

export default async function TiendaPage({ searchParams }: TiendaPageProps) {
  const sp = await searchParams
  const currentFilters: CurrentFilters = {
    category: sp.category ?? '',
    stage:    sp.stage    ?? '',
    brand:    sp.brand    ?? '',
    minPrice: sp.min_price ?? '',
    maxPrice: sp.max_price ?? '',
    sort:     sp.sort     ?? '',
    page:     sp.page     ?? '1',
  }

  const [categories, stages, brands, productsResult] = await Promise.all([
    getCategories().catch(() => []),
    getAgeStages().catch(() => []),
    getBrands().catch(() => []),
    getProducts({
      category:   currentFilters.category  || undefined,
      stage:      currentFilters.stage     || undefined,
      brand:      currentFilters.brand     || undefined,
      min_price:  currentFilters.minPrice  ? Number(currentFilters.minPrice) : undefined,
      max_price:  currentFilters.maxPrice  ? Number(currentFilters.maxPrice) : undefined,
      sort:       (currentFilters.sort     || undefined) as 'newest' | 'price_asc' | 'price_desc' | 'featured' | undefined,
      search:     sp.search                 || undefined,
      page:       Number(currentFilters.page) || 1,
      per_page:   24,
    }).catch(() => ({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 24, total: 0 },
    })),
  ])

  return (
    <>
      <SiteHeader />
      <CategoryBar categories={categories} activeSlug={currentFilters.category} />

      <main className="px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 font-display text-2xl font-bold text-ink md:text-3xl">
            {currentFilters.category
              ? (categories.find((c) => c.slug === currentFilters.category)?.name ?? 'Tienda')
              : 'Toda la tienda'}
          </h1>

          <ShopShell
            filterOptions={{ categories, stages, brands }}
            currentFilters={currentFilters}
            products={productsResult.data}
            meta={productsResult.meta}
          />
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
