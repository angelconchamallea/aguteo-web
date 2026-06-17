import Link from 'next/link'
import PackCard from '@/components/ui/PackCard'
import type { ProductListItem } from '@/types/api'

interface PacksSectionProps {
  packs: ProductListItem[]
}

export default function PacksSection({ packs }: PacksSectionProps) {
  if (packs.length === 0) return null

  return (
    <section className="px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            Packs que lo hacen fácil
          </h2>
          <Link
            href="/tienda?category=packs-regalos"
            className="text-sm font-semibold font-sans text-rose hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {packs.map((pack) => (
            <PackCard key={pack.id} product={pack} />
          ))}
        </div>
      </div>
    </section>
  )
}
