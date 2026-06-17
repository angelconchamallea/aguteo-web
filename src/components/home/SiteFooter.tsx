import Link from 'next/link'


const TIENDA_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Packs y Regalos', href: '/tienda?category=packs-regalos' },
  { label: 'Mini-guías', href: '/guias' },
]

const AYUDA_LINKS = [
  { label: 'Cómo comprar', href: '/ayuda/como-comprar' },
  { label: 'Envíos y despacho', href: '/ayuda/envios' },
  { label: 'Cambios y devoluciones', href: '/ayuda/cambios' },
  { label: 'Preguntas frecuentes', href: '/ayuda/faq' },
]

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">

        {/* Columnas */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">

          {/* Marca */}
          <div className="shrink-0 md:w-52">
            <Link href="/" aria-label="Aguteo Babys — inicio">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Aguteo Babys" className="h-[7.5rem] w-auto" />
            </Link>
            <p className="mt-3 text-xs font-sans text-white/60">
              Productos para bebés de 0 a 24 meses.
              <br />Hecho con amor en Chile. 🇨🇱
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-card bg-white/10 px-3 py-2">
              <span className="text-xs font-sans font-semibold text-white/80">
                🔒 Pago seguro con Webpay Plus
              </span>
            </div>
          </div>

          {/* Links: 3 columnas alineadas */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">

            {/* Tienda */}
            <div>
              <p className="mb-3 text-xs font-bold font-display uppercase tracking-widest text-white/50">
                Tienda
              </p>
              <ul className="space-y-2">
                {TIENDA_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-sans text-white/70 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda */}
            <div>
              <p className="mb-3 text-xs font-bold font-display uppercase tracking-widest text-white/50">
                Ayuda
              </p>
              <ul className="space-y-2">
                {AYUDA_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm font-sans text-white/70 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Síguenos */}
            <div>
              <p className="mb-3 text-xs font-bold font-display uppercase tracking-widest text-white/50">
                Síguenos
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="https://instagram.com/aguteobabys" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-sans text-white/70 hover:text-white transition-colors">
                    📸 Instagram
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/56900000000" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-sans text-white/70 hover:text-white transition-colors">
                    💬 WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:hola@aguteobabys.cl"
                    className="flex items-center gap-2 text-sm font-sans text-white/70 hover:text-white transition-colors">
                    ✉️ hola@aguteobabys.cl
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs font-sans text-white/40">
            © {new Date().getFullYear()} Aguteo Babys SpA — Hecho en Chile con mucho ❤️
          </p>
        </div>

      </div>
    </footer>
  )
}
