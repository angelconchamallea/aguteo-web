import SectionPill from '@/components/ui/SectionPill'
import type { CategoryRoot } from '@/types/api'

interface CategoryBarProps {
  categories: CategoryRoot[]
  activeSlug?: string
}

export default function CategoryBar({ categories, activeSlug }: CategoryBarProps) {
  if (categories.length === 0) return null

  return (
    <nav aria-label="Categorías" className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none md:flex-wrap md:overflow-visible md:pb-0">
          {categories.map((cat) => (
            <SectionPill
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              colorToken={cat.color_token}
              active={cat.slug === activeSlug}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
