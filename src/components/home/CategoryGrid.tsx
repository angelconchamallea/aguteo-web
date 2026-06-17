import Link from 'next/link'
import CategoryCard from '@/components/ui/CategoryCard'
import type { CategoryRoot } from '@/types/api'

interface CategoryGridProps {
  categories: CategoryRoot[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null

  return (
    <section className="px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
          Explora por categoría
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
          {/* Card "Ver todas" */}
          <Link
            href="/tienda"
            className="flex items-center justify-center gap-2 rounded-card border border-line bg-white p-4 text-sm font-semibold font-sans text-ink transition hover:shadow-sm active:scale-95"
          >
            Ver todas →
          </Link>
        </div>
      </div>
    </section>
  )
}
