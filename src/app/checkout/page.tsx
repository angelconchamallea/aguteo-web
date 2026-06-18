'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatCLP } from '@/lib/format'
import { getRegions, getCommunes, getShippingRates, validateCoupon, createOrder } from '@/lib/api'
import type { Region, Commune, ShippingRate, CouponValidationResult } from '@/types/api'

// ---------------------------------------------------------------------------
// Tipos de formulario
// ---------------------------------------------------------------------------

interface CustomerForm {
  name: string
  email: string
  phone: string
}

interface AddressForm {
  regionId: string
  communeId: string
  street: string
  number: string
  apartment: string
  notes: string
}

// ---------------------------------------------------------------------------
// Página principal
// ---------------------------------------------------------------------------

export default function CheckoutPage() {
  const router = useRouter()
  const entries = useCartStore((s) => s.entries)
  const subtotal = useCartStore((s) => s.subtotal())
  const clearCart = useCartStore((s) => s.clearCart)

  // Geo
  const [regions, setRegions] = useState<Region[]>([])
  const [communes, setCommunes] = useState<Commune[]>([])
  const [loadingRegions, setLoadingRegions] = useState(true)
  const [loadingCommunes, setLoadingCommunes] = useState(false)

  // Shipping
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([])
  const [selectedRateId, setSelectedRateId] = useState<number | null>(null)
  const [loadingRates, setLoadingRates] = useState(false)

  // Cupón
  const [couponCode, setCouponCode] = useState('')
  const [couponResult, setCouponResult] = useState<CouponValidationResult | null>(null)
  const [couponError, setCouponError] = useState('')
  const [loadingCoupon, setLoadingCoupon] = useState(false)

  // Formulario
  const [customer, setCustomer] = useState<CustomerForm>({ name: '', email: '', phone: '' })
  const [address, setAddress] = useState<AddressForm>({
    regionId: '', communeId: '', street: '', number: '', apartment: '', notes: '',
  })

  // Submit
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Redirección si carrito vacío
  useEffect(() => {
    if (entries.length === 0) router.replace('/tienda')
  }, [entries, router])

  // Carga regiones
  useEffect(() => {
    getRegions()
      .then(setRegions)
      .catch(() => {})
      .finally(() => setLoadingRegions(false))
  }, [])

  // Carga comunas al cambiar región
  useEffect(() => {
    if (!address.regionId) { setCommunes([]); return }
    setLoadingCommunes(true)
    setAddress((a) => ({ ...a, communeId: '' }))
    setShippingRates([])
    setSelectedRateId(null)
    getCommunes(Number(address.regionId))
      .then(setCommunes)
      .catch(() => setCommunes([]))
      .finally(() => setLoadingCommunes(false))
  }, [address.regionId])

  // Carga tarifas al cambiar comuna
  useEffect(() => {
    if (!address.communeId) { setShippingRates([]); setSelectedRateId(null); return }
    setLoadingRates(true)
    getShippingRates(Number(address.communeId))
      .then((rates) => {
        setShippingRates(rates)
        if (rates.length === 1) setSelectedRateId(rates[0].id)
      })
      .catch(() => setShippingRates([]))
      .finally(() => setLoadingRates(false))
  }, [address.communeId])

  async function handleValidateCoupon() {
    if (!couponCode.trim()) return
    setLoadingCoupon(true)
    setCouponError('')
    setCouponResult(null)
    try {
      const result = await validateCoupon({
        code: couponCode.trim(),
        subtotal,
        items: entries.map((e) => ({ product_id: e.product.id, quantity: e.quantity })),
      })
      setCouponResult(result)
    } catch (err: unknown) {
      setCouponError(
        (err as { body?: { message?: string } })?.body?.message ?? 'Cupón inválido o expirado.',
      )
    } finally {
      setLoadingCoupon(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedRateId || !address.communeId) return
    setSubmitting(true)
    setSubmitError('')

    try {
      const result = await createOrder({
        customer: {
          name: customer.name.trim(),
          email: customer.email.trim(),
          phone: customer.phone.trim(),
        },
        shipping_address: {
          region_id: Number(address.regionId),
          commune_id: Number(address.communeId),
          street: address.street.trim(),
          number: address.number.trim(),
          apartment: address.apartment.trim() || undefined,
          notes: address.notes.trim() || undefined,
        },
        shipping_rate_id: selectedRateId,
        coupon_code: couponResult?.code || undefined,
        items: entries.map((e) => ({
          product_id: e.product.id,
          product_variant_id: e.variantId,
          quantity: e.quantity,
        })),
      })

      // Guarda sesión de checkout en cookie httpOnly para la página de resultado
      await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: result.order_number, email: customer.email.trim() }),
      })

      clearCart()

      // Redirect a Webpay via form POST (requerido por Transbank)
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = result.webpay.url
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'token_ws'
      input.value = result.webpay.token
      form.appendChild(input)
      document.body.appendChild(form)
      form.submit()
    } catch (err: unknown) {
      const msg = (err as { body?: { message?: string } })?.body?.message
      setSubmitError(msg ?? 'Ocurrió un error al crear la orden. Intenta de nuevo.')
      setSubmitting(false)
    }
  }

  const selectedRate = shippingRates.find((r) => r.id === selectedRateId)
  const discount = couponResult?.discount_amount ?? 0
  const shipping = selectedRate?.price ?? 0
  const total = subtotal + shipping - discount

  if (entries.length === 0) return null

  return (
    <div className="min-h-screen bg-cream">
      {/* Header simplificado */}
      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/" aria-label="Aguteo Babys — inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Aguteo Babys" className="h-12 w-auto" />
          </Link>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-sans text-muted hover:text-ink transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Volver
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <h1 className="mb-8 font-display text-2xl font-bold text-ink md:text-3xl">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* ── Columna izquierda: formulario ───────────────────────── */}
          <div className="space-y-8">

            {/* Tus datos */}
            <Section title="Tus datos">
              <Field label="Nombre completo" required>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                  className={inputCls}
                  placeholder="María González"
                />
              </Field>
              <Field label="Correo electrónico" required>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                  className={inputCls}
                  placeholder="maria@correo.com"
                />
              </Field>
              <Field label="Teléfono" required>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                  className={inputCls}
                  placeholder="+56 9 1234 5678"
                />
              </Field>
            </Section>

            {/* Dirección */}
            <Section title="Dónde enviamos">
              <Field label="Región" required>
                {loadingRegions ? (
                  <LoadingSelect />
                ) : regions.length === 0 ? (
                  <div className="rounded-card border border-butter bg-butter-soft px-3 py-2">
                    <p className="text-sm font-sans text-tangerine-deep">
                      ⚠️ Las regiones estarán disponibles cuando el backend implemente <code className="text-xs">GET /regions</code> (hito A5).
                    </p>
                  </div>
                ) : (
                  <select
                    required
                    value={address.regionId}
                    onChange={(e) => setAddress((a) => ({ ...a, regionId: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="">Selecciona una región</option>
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                )}
              </Field>

              <Field label="Comuna" required>
                {loadingCommunes ? (
                  <LoadingSelect />
                ) : (
                  <select
                    required
                    value={address.communeId}
                    onChange={(e) => setAddress((a) => ({ ...a, communeId: e.target.value }))}
                    disabled={!address.regionId || communes.length === 0}
                    className={inputCls}
                  >
                    <option value="">
                      {!address.regionId ? 'Selecciona primero una región' : 'Selecciona una comuna'}
                    </option>
                    {communes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                )}
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Calle" required>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                    className={inputCls}
                    placeholder="Av. Siempre Viva"
                  />
                </Field>
                <Field label="Número" required>
                  <input
                    type="text"
                    required
                    value={address.number}
                    onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                    className={inputCls}
                    placeholder="742"
                  />
                </Field>
              </div>

              <Field label="Departamento / piso (opcional)">
                <input
                  type="text"
                  value={address.apartment}
                  onChange={(e) => setAddress((a) => ({ ...a, apartment: e.target.value }))}
                  className={inputCls}
                  placeholder="Depto 3B"
                />
              </Field>

              <Field label="Notas para el despacho (opcional)">
                <textarea
                  value={address.notes}
                  onChange={(e) => setAddress((a) => ({ ...a, notes: e.target.value }))}
                  rows={2}
                  className={`${inputCls} resize-none`}
                  placeholder="Dejar en conserjería, timbre no funciona…"
                />
              </Field>
            </Section>

            {/* Envío */}
            <Section title="Costo de envío">
              {!address.communeId ? (
                <p className="text-sm font-sans text-muted">Selecciona una comuna para ver las tarifas de envío.</p>
              ) : loadingRates ? (
                <LoadingSelect />
              ) : shippingRates.length === 0 ? (
                <p className="text-sm font-sans text-coral">No hay tarifas disponibles para esta comuna.</p>
              ) : (
                <div className="space-y-2">
                  {shippingRates.map((rate) => (
                    <label
                      key={rate.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-card border p-3 transition ${
                        selectedRateId === rate.id ? 'border-aqua bg-aqua-soft' : 'border-line bg-white hover:bg-cream'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping_rate"
                        value={rate.id}
                        checked={selectedRateId === rate.id}
                        onChange={() => setSelectedRateId(rate.id)}
                        className="mt-0.5 accent-aqua"
                        required
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold font-sans text-ink">{rate.name}</p>
                        <p className="text-xs font-sans text-muted">{rate.estimated_days}</p>
                      </div>
                      <p className="text-sm font-bold font-sans text-ink">
                        {rate.price === 0 ? 'Gratis' : formatCLP(rate.price)}
                      </p>
                    </label>
                  ))}
                </div>
              )}
            </Section>

            {/* Cupón */}
            <Section title="¿Tienes un código de descuento?">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase())
                    setCouponResult(null)
                    setCouponError('')
                  }}
                  className={`${inputCls} flex-1 uppercase`}
                  placeholder="BIENVENIDA10"
                  disabled={!!couponResult}
                />
                {couponResult ? (
                  <button
                    type="button"
                    onClick={() => { setCouponResult(null); setCouponCode('') }}
                    className="rounded-pill border border-line bg-white px-4 py-2 text-sm font-sans font-semibold text-muted hover:text-rose transition"
                  >
                    Quitar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleValidateCoupon}
                    disabled={loadingCoupon || !couponCode.trim()}
                    className="rounded-pill bg-ink px-4 py-2 text-sm font-sans font-semibold text-white transition hover:opacity-80 disabled:opacity-40"
                  >
                    {loadingCoupon ? '…' : 'Aplicar'}
                  </button>
                )}
              </div>
              {couponResult && (
                <p className="mt-1 text-sm font-sans text-aqua-deep">
                  ✓ Descuento de {formatCLP(couponResult.discount_amount)} aplicado
                </p>
              )}
              {couponError && (
                <p className="mt-1 text-sm font-sans text-coral">{couponError}</p>
              )}
            </Section>
          </div>

          {/* ── Columna derecha: resumen ──────────────────────────────── */}
          <div className="lg:sticky lg:top-24 space-y-4 self-start">
            <div className="rounded-card border border-line bg-white p-5 space-y-4">
              <p className="font-display font-bold text-ink">Resumen del pedido</p>

              {/* Items */}
              <ul className="space-y-3">
                {entries.map((e) => {
                  const softBg = e.product.category.color_token + '22'
                  const key = `${e.product.id}-${e.variantId ?? 'nv'}`
                  return (
                    <li key={key} className="flex items-center gap-2">
                      <div
                        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-card"
                        style={{ backgroundColor: softBg }}
                      >
                        {e.product.cover_image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={e.product.cover_image_url}
                            alt={e.product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-sans font-semibold text-ink">{e.product.name}</p>
                        <p className="text-xs font-sans text-muted">× {e.quantity}</p>
                      </div>
                      <p className="text-xs font-sans font-bold text-ink">
                        {formatCLP(e.product.price * e.quantity)}
                      </p>
                    </li>
                  )
                })}
              </ul>

              <div className="border-t border-line pt-3 space-y-1.5 text-sm font-sans">
                <Row label="Subtotal" value={formatCLP(subtotal)} />
                <Row
                  label="Envío"
                  value={selectedRate ? (selectedRate.price === 0 ? 'Gratis' : formatCLP(selectedRate.price)) : '—'}
                />
                {couponResult && (
                  <Row label={`Descuento (${couponResult.code})`} value={`− ${formatCLP(discount)}`} highlight />
                )}
              </div>

              <div className="border-t border-line pt-3 flex items-center justify-between">
                <span className="font-display font-bold text-ink">Total estimado</span>
                <span className="font-display text-lg font-bold text-ink">
                  {selectedRate ? formatCLP(total) : '—'}
                </span>
              </div>

              <p className="text-xs font-sans text-muted">
                El backend recalcula y confirma el total antes de procesar el pago.
              </p>
            </div>

            {submitError && (
              <div className="rounded-card border border-coral bg-coral/10 p-3">
                <p className="text-sm font-sans text-coral">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !selectedRateId}
              className="w-full rounded-pill bg-rose py-4 font-display text-base font-bold text-white transition hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Procesando…' : 'Pagar con Webpay'}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs font-sans text-muted">
              <LockIcon />
              Pago seguro con Webpay Plus
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-white p-5 space-y-4">
      <p className="font-display font-bold text-ink">{title}</p>
      {children}
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold font-sans text-ink">
        {label}{required && <span className="ml-0.5 text-rose">*</span>}
      </label>
      {children}
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={highlight ? 'font-semibold text-aqua-deep' : 'text-ink'}>{value}</span>
    </div>
  )
}

function LoadingSelect() {
  return (
    <div className="h-10 w-full animate-pulse rounded-card bg-line" />
  )
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const inputCls =
  'w-full rounded-card border border-line bg-cream px-3 py-2 text-sm font-sans text-ink focus:border-aqua focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
