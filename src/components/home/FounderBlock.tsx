'use client'

import { useState } from 'react'

export default function FounderBlock() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-card bg-rose-soft px-6 py-10 text-center md:px-12">
          <span className="text-4xl">👶🏻👶🏻</span>
          <h2 className="mt-4 font-display text-2xl font-bold text-rose-deep md:text-3xl">
            Somos papás de gemelos
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-base text-rose-deep/80">
            Aguteo Babys nació de buscar en mil lugares lo que nuestros bebés necesitaban.
            Hoy lo reunimos todo en un solo lugar, con guías reales y precios justos.
          </p>

          <div className="mt-8">
            {submitted ? (
              <div className="inline-flex items-center gap-2 rounded-pill bg-rose-deep px-6 py-3 font-sans text-sm font-semibold text-white">
                <span>✓</span> ¡Suscrito! Te avisamos de lo nuevo.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.cl"
                  required
                  className="flex-1 rounded-pill border border-line bg-white px-4 py-2.5 text-sm font-sans text-ink placeholder:text-muted focus:border-rose focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-pill bg-rose px-6 py-2.5 text-sm font-bold font-display text-white transition hover:opacity-90 active:scale-95 shrink-0"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
