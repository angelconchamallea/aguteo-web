'use client'

import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { useCartStore } from '@/store/cart'
import type { ProductListItem } from '@/types/api'

interface FeaturedProductsProps {
  products: ProductListItem[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const addItem = useCartStore((s) => s.addItem)

  if (products.length === 0) return null

  return (
    <section className="px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            Favoritos de las mamás
          </h2>
          <Link
            href="/tienda?featured=true"
            className="text-sm font-semibold font-sans text-rose hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
