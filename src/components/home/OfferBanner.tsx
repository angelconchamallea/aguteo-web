import Link from 'next/link'

export default function OfferBanner() {
  return (
    <section className="bg-ink px-4 py-10 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-xs font-bold font-display text-butter uppercase tracking-wider">
            Semana del bebé
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
            Hasta 30% de descuento
          </h2>
          <p className="mt-1 font-sans text-sm text-white/70">
            En alimentación y cuidado — solo por tiempo limitado.
          </p>
        </div>
        <Link
          href="/tienda?sort=price_asc"
          className="inline-flex items-center justify-center rounded-pill bg-butter px-6 py-3 text-sm font-bold font-display text-butter-deep transition hover:opacity-90 active:scale-95 shrink-0"
        >
          Ver ofertas
        </Link>
      </div>
    </section>
  )
}
