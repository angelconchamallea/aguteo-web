import Link from 'next/link'
import type { CategoryRoot } from '@/types/api'

const ICON_MAP: Record<string, string> = {
  shirt:       '👕',
  baby_bottle: '🍼',
  bath:        '🛁',
  toy:         '🧸',
  heart:       '💛',
  gift:        '🎁',
  star:        '⭐',
  default:     '✨',
}

interface CategoryCardProps {
  category: CategoryRoot
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const icon = ICON_MAP[category.icon] ?? ICON_MAP.default
  const subcount = category.children.length

  return (
    <Link
      href={`/tienda?category=${category.slug}`}
      className="flex items-center gap-3 rounded-card border border-line bg-white p-3 transition hover:shadow-sm active:scale-95"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card text-xl"
        style={{ backgroundColor: category.color_token + '33' }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold font-sans text-ink">{category.name}</p>
        <p className="text-xs text-muted">
          {subcount > 0 ? `${subcount} subcategorías` : 'Ver productos'}
        </p>
      </div>
    </Link>
  )
}
