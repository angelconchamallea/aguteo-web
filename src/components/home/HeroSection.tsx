import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="px-4 py-10 md:py-14 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:gap-8">

        {/* Bloque principal */}
        <div className="flex flex-1 flex-col gap-5">
          <span className="inline-block self-start -rotate-1 rounded-card bg-butter px-3 py-1 text-xs font-bold font-display text-butter-deep">
            HECHO POR PAPÁS DE GEMELOS
          </span>

          <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
            Acompañamos cada etapa<br className="hidden sm:block" /> de tu{' '}
            <span className="text-rose">bebé</span>
          </h1>

          <p className="font-sans text-base text-muted">
            Todo lo que necesitas para los primeros 24 meses, a buen precio.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center rounded-pill bg-rose px-6 py-3 text-base font-bold font-display text-white transition hover:opacity-90 active:scale-95"
            >
              Comprar ahora
            </Link>
            <Link
              href="/#etapas"
              className="inline-flex items-center justify-center rounded-pill border border-line bg-white px-6 py-3 text-base font-sans text-ink transition hover:bg-cream active:scale-95"
            >
              Ver por etapa
            </Link>
          </div>
        </div>

        {/* Tarjetas apiladas (novedad / oferta) */}
        <div className="grid grid-cols-2 gap-3 md:w-64 md:grid-cols-1">
          <div className="rounded-card bg-aqua-soft p-5">
            <p className="mb-1 text-xs font-bold font-display text-aqua-deep">NOVEDAD</p>
            <p className="text-sm font-sans text-aqua-deep">Llegaron compotas Amma</p>
            <Link
              href="/tienda?category=alimentacion"
              className="mt-3 inline-block text-xs font-semibold font-sans text-aqua-deep underline underline-offset-2"
            >
              Ver productos →
            </Link>
          </div>
          <div className="rounded-card bg-tangerine-soft p-5">
            <p className="mb-1 text-xs font-bold font-display text-tangerine-deep">OFERTA</p>
            <p className="text-sm font-sans text-tangerine-deep">2x1 en pañales seleccionados</p>
            <Link
              href="/tienda?category=cuidado-higiene"
              className="mt-3 inline-block text-xs font-semibold font-sans text-tangerine-deep underline underline-offset-2"
            >
              Ver ofertas →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
