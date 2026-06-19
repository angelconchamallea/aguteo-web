import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getGuide } from '@/lib/api'
import { ApiException } from '@/lib/api'
import SiteHeader from '@/components/home/SiteHeader'
import SiteFooter from '@/components/home/SiteFooter'
import GuideBody from '@/components/guide/GuideBody'
import ProductCard from '@/components/ui/ProductCard'

export const revalidate = 3600

interface GuidePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const guide = await getGuide(slug)
    const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aguteobabys.cl'
    return {
      title: `${guide.title} | Mini-guías Aguteo Babys`,
      description: guide.excerpt,
      openGraph: {
        title: guide.title,
        description: guide.excerpt,
        url: `${BASE}/guias/${guide.slug}`,
        images: guide.cover_image_url ? [{ url: guide.cover_image_url, alt: guide.title }] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: guide.title,
        description: guide.excerpt,
        images: guide.cover_image_url ? [guide.cover_image_url] : [],
      },
    }
  } catch {
    return { title: 'Guía | Aguteo Babys' }
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params

  let guide
  try {
    guide = await getGuide(slug)
  } catch (e) {
    if (e instanceof ApiException && e.status === 404) notFound()
    throw e
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-8 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-1 text-xs font-sans text-muted">
          <Link href="/" className="hover:text-ink transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/guias" className="hover:text-ink transition-colors">Mini-guías</Link>
          <span>/</span>
          <span className="text-ink">{guide.title}</span>
        </nav>

        {/* Badge etapa */}
        <span
          className="mb-4 inline-block rounded-pill px-3 py-1 text-xs font-bold font-display text-white"
          style={{ backgroundColor: guide.age_stage.color_token }}
        >
          {guide.age_stage.name}
        </span>

        {/* Título */}
        <h1 className="mb-6 font-display text-2xl font-bold leading-tight text-ink md:text-3xl lg:text-4xl">
          {guide.title}
        </h1>

        {/* Imagen portada */}
        {guide.cover_image_url && (
          <div
            className="relative mb-8 aspect-video w-full overflow-hidden rounded-card"
            style={{ backgroundColor: guide.age_stage.color_token + '22' }}
          >
            <Image
              src={guide.cover_image_url}
              alt={guide.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Cuerpo en markdown */}
        {guide.body ? (
          <GuideBody content={guide.body} />
        ) : (
          <p className="font-sans text-muted">Esta guía no tiene contenido todavía.</p>
        )}

        {/* Productos recomendados */}
        {guide.products.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 border-t border-line pt-8">
              <h2 className="font-display text-xl font-bold text-ink">
                Productos recomendados en esta guía
              </h2>
              <p className="mt-1 font-sans text-sm text-muted">
                Seleccionados por nuestro equipo para esta etapa.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {guide.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Volver */}
        <div className="mt-12 border-t border-line pt-6">
          <Link
            href="/guias"
            className="text-sm font-sans font-semibold text-aqua-deep hover:underline"
          >
            ← Ver todas las mini-guías
          </Link>
        </div>

      </main>

      <SiteFooter />
    </>
  )
}
