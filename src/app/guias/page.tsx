import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getGuides, getAgeStages } from '@/lib/api'
import SiteHeader from '@/components/home/SiteHeader'
import SiteFooter from '@/components/home/SiteFooter'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mini-guías para bebés | Aguteo Babys',
  description:
    'Consejos y recomendaciones por etapa del bebé de 0 a 24 meses. Productos seleccionados por papás de gemelos.',
  openGraph: {
    title: 'Mini-guías para bebés | Aguteo Babys',
    description: 'Consejos y recomendaciones por etapa del bebé de 0 a 24 meses.',
  },
}

interface GuiasPageProps {
  searchParams: Promise<{ stage?: string }>
}

export default async function GuiasPage({ searchParams }: GuiasPageProps) {
  const { stage } = await searchParams

  const [guidesResult, stages] = await Promise.all([
    getGuides(stage || undefined).catch(() => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 24, total: 0 } })),
    getAgeStages().catch(() => []),
  ])

  const guides = guidesResult.data

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8">

        {/* Encabezado */}
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Mini-guías
          </h1>
          <p className="font-sans text-muted">
            Consejos y productos recomendados por etapa del bebé.
          </p>
        </div>

        {/* Filtro por etapa */}
        {stages.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/guias"
              className={`rounded-pill px-4 py-1.5 text-sm font-sans font-semibold transition ${
                !stage ? 'bg-ink text-white' : 'border border-line bg-white text-ink hover:bg-cream'
              }`}
            >
              Todas
            </Link>
            {stages.map((s) => {
              const isActive = stage === s.slug
              return (
                <Link
                  key={s.slug}
                  href={`/guias?stage=${s.slug}`}
                  className={`rounded-pill px-4 py-1.5 text-sm font-sans font-semibold transition ${
                    isActive ? 'text-white' : 'border border-line bg-white text-ink hover:bg-cream'
                  }`}
                  style={isActive ? { backgroundColor: s.color_token } : {}}
                >
                  {s.name}
                </Link>
              )
            })}
          </div>
        )}

        {/* Grid de guías */}
        {guides.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="text-5xl">📖</span>
            <p className="font-display text-xl font-bold text-ink">
              {stage ? 'Sin guías para esta etapa' : 'Guías próximamente'}
            </p>
            <p className="font-sans text-sm text-muted">
              Estamos preparando contenido con mucho amor. 💛
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guias/${guide.slug}`}
                className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-shadow hover:shadow-md"
              >
                {/* Imagen portada */}
                <div
                  className="relative aspect-video w-full overflow-hidden"
                  style={{ backgroundColor: guide.age_stage.color_token + '22' }}
                >
                  {guide.cover_image_url ? (
                    <Image
                      src={guide.cover_image_url}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
                      📖
                    </div>
                  )}
                  {/* Badge etapa */}
                  <span
                    className="absolute bottom-2 left-2 rounded-pill px-2 py-0.5 text-xs font-bold font-display text-white"
                    style={{ backgroundColor: guide.age_stage.color_token }}
                  >
                    {guide.age_stage.name}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h2 className="font-display text-base font-bold text-ink leading-snug group-hover:text-aqua-deep transition-colors">
                    {guide.title}
                  </h2>
                  <p className="line-clamp-2 text-sm font-sans text-muted leading-relaxed">
                    {guide.excerpt}
                  </p>
                  <span className="mt-auto pt-2 text-sm font-semibold font-sans text-rose">
                    Leer guía →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
