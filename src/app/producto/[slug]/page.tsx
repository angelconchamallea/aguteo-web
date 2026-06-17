import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getProducts } from '@/lib/api'
import { ApiException } from '@/lib/api'
import SiteHeader from '@/components/home/SiteHeader'
import SiteFooter from '@/components/home/SiteFooter'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductCard from '@/components/ui/ProductCard'

export const revalidate = 300

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product
  try {
    product = await getProduct(params.slug)
  } catch (e) {
    if (e instanceof ApiException && e.status === 404) notFound()
    throw e
  }

  // Productos "te puede servir" — misma etapa, excluye el actual
  const stageSlug = product.age_stages[0]?.slug
  const relatedResult = stageSlug
    ? await getProducts({ stage: stageSlug, per_page: 5 }).catch(() => ({ data: [] }))
    : { data: [] }
  const related = relatedResult.data.filter((p) => p.id !== product.id).slice(0, 4)

  const breadcrumb = product.category.breadcrumb ?? []
  const categoryColor = product.category.color_token

  return (
    <>
      <SiteHeader />

      <main className="px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* Breadcrumb */}
          <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-1 text-xs font-sans text-muted">
            <Link href="/" className="hover:text-ink transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/tienda" className="hover:text-ink transition-colors">Tienda</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.slug} className="flex items-center gap-1">
                <span>/</span>
                <Link
                  href={`/tienda?category=${crumb.slug}`}
                  className="hover:text-ink transition-colors"
                >
                  {crumb.name}
                </Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          {/* Grid principal: galería + info */}
          <div className="grid gap-8 lg:grid-cols-2">
            <ProductGallery
              images={product.images}
              coverUrl={product.cover_image_url}
              productName={product.name}
              categoryColorHex={categoryColor}
            />
            <ProductInfo product={product} />
          </div>

          {/* Te puede servir */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 font-display text-xl font-bold text-ink">
                Te puede servir
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <SiteFooter />
    </>
  )
}
