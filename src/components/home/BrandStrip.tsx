import type { Brand } from '@/types/api'

interface BrandStripProps {
  brands: Brand[]
}

export default function BrandStrip({ brands }: BrandStripProps) {
  if (brands.length === 0) return null

  return (
    <section className="border-y border-line px-4 py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-center text-xs font-sans font-semibold uppercase tracking-widest text-muted">
          Marcas que encontrarás
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {brands.map((brand) => (
            <span
              key={brand.slug}
              className="text-sm font-bold font-display text-muted/60 uppercase tracking-wide"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
