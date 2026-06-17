'use client'

import { useState } from 'react'
import Link from 'next/link'
import PriceTag from '@/components/ui/PriceTag'
import Badge from '@/components/ui/Badge'
import { useCartStore } from '@/store/cart'
import type { ProductDetail, ProductVariant } from '@/types/api'

interface ProductInfoProps {
  product: ProductDetail
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null,
  )
  const [added, setAdded] = useState(false)

  const displayPrice = selectedVariant?.price ?? product.price
  const displayCompare = product.compare_at_price
  const categoryColor = product.category.color_token
  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.in_stock
  const lowStock = selectedVariant ? selectedVariant.stock > 0 && selectedVariant.stock < 5 : false

  function handleAddToCart() {
    if (!inStock) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      {/* Contenido del producto */}
      <div className="flex flex-col gap-5 pb-24 md:pb-0">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold font-sans" style={{ color: categoryColor }}>
            {product.category.root?.name ?? product.category.name}
          </span>
          {product.age_stages.map((s) => (
            <Badge
              key={s.slug}
              variant="etapa"
              label={s.slug}
              colorHex={s.color_token}
              rotate="left"
            />
          ))}
          {product.featured && <Badge variant="nuevo" rotate="right" />}
          {product.discount_percent && (
            <Badge variant="descuento" discountPercent={product.discount_percent} />
          )}
        </div>

        {/* Nombre */}
        <h1 className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
          {product.name}
        </h1>

        {/* Rating — solo si no es null */}
        {product.rating !== null && (
          <div className="flex items-center gap-1 text-sm text-muted">
            ⭐ {product.rating.toFixed(1)}
            <span>({product.reviews_count} opiniones)</span>
          </div>
        )}

        {/* Precio */}
        <PriceTag price={displayPrice} compareAtPrice={displayCompare} size="lg" />

        {/* Selector de talla/variante */}
        {product.variants.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold font-sans text-ink">
              Talla
              {selectedVariant && (
                <span className="ml-2 font-normal text-muted">— {selectedVariant.size}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => {
                const outOfStock = v.stock === 0
                const isSelected = selectedVariant?.id === v.id
                return (
                  <button
                    key={v.id}
                    onClick={() => !outOfStock && setSelectedVariant(v)}
                    disabled={outOfStock}
                    className={`relative rounded-pill border px-4 py-1.5 text-sm font-sans transition ${
                      isSelected
                        ? 'border-rose bg-rose font-semibold text-white'
                        : outOfStock
                        ? 'cursor-not-allowed border-line text-muted line-through opacity-50'
                        : 'border-line text-ink hover:border-rose/50'
                    }`}
                  >
                    {v.size ?? v.color ?? `Variante ${v.id}`}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Stock bajo */}
        {lowStock && selectedVariant && (
          <p className="text-sm font-sans font-semibold text-coral">
            ¡Quedan pocas unidades! ({selectedVariant.stock} disponibles)
          </p>
        )}
        {!inStock && (
          <p className="text-sm font-sans font-semibold text-muted">Se agotó por ahora 💛</p>
        )}

        {/* Botón escritorio */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`hidden rounded-pill py-3.5 text-base font-bold font-display text-white transition md:block ${
            added
              ? 'bg-aqua-deep'
              : inStock
              ? 'bg-rose hover:opacity-90 active:scale-95'
              : 'cursor-not-allowed bg-muted opacity-50'
          }`}
        >
          {added ? '✓ ¡Agregado! 🧸' : inStock ? 'Agregar al carrito' : 'Sin stock'}
        </button>

        {/* Descripción */}
        {product.description && (
          <div className="space-y-1">
            <p className="text-sm font-semibold font-sans text-ink">Descripción</p>
            <p className="whitespace-pre-wrap text-sm font-sans text-muted leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* SKU */}
        <p className="text-xs text-muted font-sans">SKU: {product.sku}</p>

        {/* Guías relacionadas */}
        {product.related_guides.length > 0 && (
          <div className="rounded-card bg-aqua-soft p-4 space-y-2">
            <p className="text-xs font-bold font-display text-aqua-deep uppercase tracking-wide">
              Guías relacionadas
            </p>
            {product.related_guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="block text-sm font-sans text-aqua-deep hover:underline"
              >
                📖 {g.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Barra inferior fija — solo mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center gap-3 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur-sm md:hidden">
        <div className="flex-1">
          <PriceTag price={displayPrice} compareAtPrice={displayCompare} size="md" />
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`rounded-pill px-6 py-3 text-sm font-bold font-display text-white transition active:scale-95 ${
            added
              ? 'bg-aqua-deep'
              : inStock
              ? 'bg-rose hover:opacity-90'
              : 'cursor-not-allowed bg-muted opacity-50'
          }`}
        >
          {added ? '✓ Agregado' : inStock ? 'Agregar' : 'Sin stock'}
        </button>
      </div>
    </>
  )
}
