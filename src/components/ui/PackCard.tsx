import Link from 'next/link'
import PriceTag from './PriceTag'
import type { ProductListItem } from '@/types/api'

interface PackCardProps {
  product: ProductListItem
}

export default function PackCard({ product }: PackCardProps) {
  const colorHex = product.category.color_token

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="flex flex-col gap-4 rounded-card p-5 transition hover:shadow-md active:scale-95"
      style={{ backgroundColor: colorHex + '22' }}
    >
      <div className="text-center text-5xl">🎁</div>

      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-2 font-display font-bold text-ink">{product.name}</h3>
        {product.short_description && (
          <p className="line-clamp-1 text-xs font-sans text-ink/60">{product.short_description}</p>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <PriceTag price={product.price} compareAtPrice={product.compare_at_price} size="sm" />
        {product.discount_percent != null && (
          <span
            className="rounded-pill bg-white px-2 py-0.5 text-xs font-bold font-display"
            style={{ color: colorHex }}
          >
            AHORRA {product.discount_percent}%
          </span>
        )}
      </div>
    </Link>
  )
}
