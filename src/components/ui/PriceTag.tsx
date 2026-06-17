import { formatCLP } from '@/lib/format'

interface PriceTagProps {
  price: number
  compareAtPrice?: number | null
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
}

export default function PriceTag({ price, compareAtPrice, size = 'md' }: PriceTagProps) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`font-display font-bold text-ink ${sizeClasses[size]}`}>
        {formatCLP(price)}
      </span>
      {compareAtPrice != null && compareAtPrice > price && (
        <span className="text-sm font-sans text-muted line-through">
          {formatCLP(compareAtPrice)}
        </span>
      )}
    </span>
  )
}
