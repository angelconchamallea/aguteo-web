import Link from 'next/link'
import type { Guide } from '@/types/api'

interface MiniGuideBlockProps {
  guide: Guide | null
}

export default function MiniGuideBlock({ guide }: MiniGuideBlockProps) {
  if (!guide) return null

  return (
    <section className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 rounded-card bg-aqua-soft p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="text-3xl shrink-0">📖</span>
            <div>
              <p className="text-xs font-bold font-display text-aqua-deep uppercase tracking-wide">
                Mini-guía
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-aqua-deep">
                {guide.title}
              </h3>
              {guide.excerpt && (
                <p className="mt-1 text-sm font-sans text-aqua-deep/80 line-clamp-2">
                  {guide.excerpt}
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/guias/${guide.slug}`}
            className="inline-flex shrink-0 items-center justify-center rounded-pill border-2 border-aqua-deep px-5 py-2.5 text-sm font-bold font-display text-aqua-deep transition hover:bg-aqua-deep hover:text-white active:scale-95"
          >
            Leer guía →
          </Link>
        </div>
      </div>
    </section>
  )
}
