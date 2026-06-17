'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Badge from './Badge'
import PriceTag from './PriceTag'
import type { ProductListItem } from '@/types/api'

interface ProductCardProps {
  product: ProductListItem
  onAddToCart?: (product: ProductListItem) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false)
  const categoryColor = product.category.color_token
  const softBg = categoryColor + '22'

  const hasDiscount = product.compare_at_price != null && product.discount_percent != null
  const lowStock = !product.in_stock

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    // decorativo en v1
  }

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col rounded-card border border-line bg-white overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* Imagen 1:1 */}
      <div className="relative aspect-square w-full" style={{ backgroundColor: softBg }}>
        {product.cover_image_url ? (
          <Image
            src={product.cover_image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-30">🧸</span>
          </div>
        )}

        {/* Badges superpuestos arriba-izquierda */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.featured && <Badge variant="nuevo" rotate="left" />}
          {hasDiscount && (
            <Badge
              variant="descuento"
              discountPercent={product.discount_percent!}
              rotate="right"
            />
          )}
        </div>

        {/* Corazón — decorativo en v1 */}
        <button
          onClick={handleWishlist}
          aria-label="Guardar en favoritos"
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-muted backdrop-blur-sm transition hover:text-rose"
        >
          <HeartIcon />
        </button>

        {/* Badge "POCAS UNIDADES" abajo-izquierda */}
        {lowStock && (
          <span
            className="absolute bottom-2 left-2 rounded-pill px-2 py-0.5 text-xs font-bold font-display bg-white"
            style={{ color: categoryColor }}
          >
            POCAS UNIDADES
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Meta: CATEGORÍA · ETAPA */}
        <p className="text-xs font-sans truncate" style={{ color: categoryColor }}>
          {product.category.name}
          {product.age_stages.length > 0 && (
            <> · {product.age_stages.map((s) => s.slug).join(', ')}</>
          )}
        </p>

        {/* Nombre — 2 líneas máx */}
        <p className="line-clamp-2 text-sm font-sans font-semibold text-ink leading-snug h-10">
          {product.name}
        </p>

        {/* Rating — solo si no es null */}
        {product.rating !== null && (
          <div className="flex items-center gap-1 text-xs text-muted">
            <StarIcon className="h-3 w-3 text-butter-deep" />
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviews_count})</span>
          </div>
        )}

        {/* Precio + botón de acción */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <PriceTag price={product.price} compareAtPrice={product.compare_at_price} size="sm" />

          <button
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.name} al carrito`}
            disabled={!product.in_stock}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed ${justAdded ? 'bg-aqua-deep scale-90' : 'bg-rose hover:opacity-90'}`}
          >
            {justAdded ? <CheckIcon /> : <PlusIcon />}
          </button>
        </div>
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Íconos inline (evita dependencia externa en W1)
// ---------------------------------------------------------------------------

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.5c0-2.485-2.015-4.5-4.5-4.5A4.49 4.49 0 0 0 12 6.193 4.49 4.49 0 0 0 7.5 4C5.015 4 3 6.015 3 8.5c0 5.5 9 11 9 11s9-5.5 9-11z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
