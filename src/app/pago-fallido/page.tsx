import Link from 'next/link'

export default function PagoFallidoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-sm text-center space-y-5">
        <span className="text-6xl">😔</span>
        <h1 className="font-display text-2xl font-bold text-ink">
          El pago no se completó
        </h1>
        <p className="font-sans text-sm text-muted leading-relaxed">
          Tu tarjeta no fue cargada. Puede haber sido un rechazo del banco, una sesión expirada o
          una cancelación manual. Tu carrito permanece guardado.
        </p>

        <div className="rounded-card border border-line bg-white p-4 text-left space-y-2">
          <p className="text-xs font-semibold font-sans text-muted uppercase tracking-wide">Qué puedes hacer</p>
          <ul className="space-y-1 text-sm font-sans text-ink list-disc list-inside">
            <li>Intentar con otra tarjeta</li>
            <li>Verificar el límite o fondos disponibles</li>
            <li>Contactar a tu banco si el problema persiste</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/checkout"
            className="rounded-pill bg-rose px-6 py-3 font-display font-bold text-white hover:opacity-90 transition"
          >
            Intentar de nuevo
          </Link>
          <Link
            href="/tienda"
            className="rounded-pill border border-line bg-white px-6 py-3 font-sans font-semibold text-ink hover:bg-cream transition"
          >
            Volver a la tienda
          </Link>
        </div>

        <p className="text-xs font-sans text-muted">
          ¿Necesitas ayuda?{' '}
          <a href="https://wa.me/56900000000" className="underline hover:text-ink transition-colors">
            Escríbenos por WhatsApp
          </a>
        </p>
      </div>
    </div>
  )
}
