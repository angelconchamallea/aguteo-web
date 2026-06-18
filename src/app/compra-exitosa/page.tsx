'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getOrderStatus } from '@/lib/api'
import { formatCLP } from '@/lib/format'
import type { OrderStatusResult } from '@/types/api'

export default function CompraExitosaPage() {
  const [order, setOrder] = useState<OrderStatusResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Lee la sesión guardada antes del redirect a Webpay
    fetch('/api/checkout-session')
      .then((r) => r.json())
      .then(async ({ session }) => {
        if (!session?.orderNumber || !session?.email) {
          setError(true)
          return
        }
        const result = await getOrderStatus(session.orderNumber, session.email)
        setOrder(result)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center space-y-3">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-aqua border-t-transparent" />
          <p className="font-sans text-sm text-muted">Verificando tu pago…</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="max-w-sm text-center space-y-4">
          <span className="text-5xl">🔍</span>
          <p className="font-display text-xl font-bold text-ink">No encontramos tu orden</p>
          <p className="font-sans text-sm text-muted">
            Si completaste el pago, recibirás un correo de confirmación pronto.
          </p>
          <Link href="/" className="inline-block rounded-pill bg-rose px-6 py-3 font-display font-bold text-white hover:opacity-90 transition">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <span className="text-6xl">🎉</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          ¡Gracias por tu compra!
        </h1>
        <p className="mt-2 font-sans text-muted">
          Tu pedido <span className="font-semibold text-ink">{order.order_number}</span> fue recibido y está siendo preparado con mucho amor. 💛
        </p>

        <div className="mt-8 rounded-card border border-line bg-white p-5 text-left space-y-4">
          <p className="font-display font-bold text-ink">Detalle del pedido</p>

          <ul className="space-y-2">
            {order.items.map((item, i) => (
              <li key={i} className="flex items-center justify-between text-sm font-sans">
                <span className="text-ink">
                  {item.name} <span className="text-muted">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-ink">{formatCLP(item.subtotal)}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-line pt-3 flex items-center justify-between">
            <span className="font-display font-bold text-ink">Total pagado</span>
            <span className="font-display text-lg font-bold text-ink">{formatCLP(order.total)}</span>
          </div>
        </div>

        <p className="mt-6 font-sans text-sm text-muted">
          Te enviamos la confirmación y los datos de seguimiento al correo que ingresaste.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/tienda"
            className="rounded-pill border border-line bg-white px-6 py-3 font-sans font-semibold text-ink hover:bg-cream transition"
          >
            Seguir comprando
          </Link>
          <Link
            href="/"
            className="rounded-pill bg-rose px-6 py-3 font-display font-bold text-white hover:opacity-90 transition"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
