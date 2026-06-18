'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatCLP } from '@/lib/format'

export default function CartDrawer() {
  const entries = useCartStore((s) => s.entries)
  const open = useCartStore((s) => s.drawerOpen)
  const closeDrawer = useCartStore((s) => s.closeDrawer)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const subtotal = useCartStore((s) => s.subtotal())

  // Cierra con Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, closeDrawer])

  // Bloquea scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito"
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col bg-cream shadow-2xl transition-transform duration-300 sm:w-[400px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="font-display text-lg font-bold text-ink">
            Tu carrito
            {entries.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted">
                ({entries.length} {entries.length === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </p>
          <button
            onClick={closeDrawer}
            aria-label="Cerrar carrito"
            className="text-muted transition-colors hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Lista de items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="text-5xl">🛒</span>
              <p className="font-display text-lg font-bold text-ink">Tu carrito está vacío</p>
              <p className="text-sm font-sans text-muted">Agrega productos para continuar.</p>
              <button
                onClick={closeDrawer}
                className="mt-2 rounded-pill border border-line bg-white px-5 py-2 text-sm font-sans font-semibold text-ink hover:bg-cream transition"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry) => {
                const softBg = entry.product.category.color_token + '22'
                const key = `${entry.product.id}-${entry.variantId ?? 'nv'}`
                return (
                  <li key={key} className="flex gap-3">
                    {/* Imagen */}
                    <Link
                      href={`/producto/${entry.product.slug}`}
                      onClick={closeDrawer}
                      className="h-16 w-16 shrink-0 overflow-hidden rounded-card"
                      style={{ backgroundColor: softBg }}
                    >
                      {entry.product.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.product.cover_image_url}
                          alt={entry.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl opacity-40">
                          🧸
                        </div>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-1 min-w-0">
                      <Link
                        href={`/producto/${entry.product.slug}`}
                        onClick={closeDrawer}
                        className="line-clamp-2 text-sm font-semibold font-sans text-ink hover:underline"
                      >
                        {entry.product.name}
                      </Link>
                      <p className="text-sm font-sans font-bold text-ink">
                        {formatCLP(entry.product.price)}
                      </p>

                      {/* Controles de cantidad */}
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(entry.product.id, entry.variantId, entry.quantity - 1)
                          }
                          aria-label="Quitar uno"
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink hover:bg-line transition"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm font-sans font-semibold text-ink">
                          {entry.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(entry.product.id, entry.variantId, entry.quantity + 1)
                          }
                          aria-label="Agregar uno"
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-ink hover:bg-line transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(entry.product.id, entry.variantId)}
                          aria-label="Eliminar producto"
                          className="ml-auto text-xs font-sans text-muted hover:text-rose transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer con subtotal y CTA */}
        {entries.length > 0 && (
          <div className="border-t border-line px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-sans text-muted">Subtotal</span>
              <span className="font-display text-lg font-bold text-ink">
                {formatCLP(subtotal)}
              </span>
            </div>
            <p className="text-xs font-sans text-muted">
              Envío y descuentos se calculan en el checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full rounded-pill bg-rose py-3 text-center font-display font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              Ir al checkout
            </Link>
            <button
              onClick={closeDrawer}
              className="w-full text-center text-sm font-sans text-muted hover:text-ink transition-colors"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
