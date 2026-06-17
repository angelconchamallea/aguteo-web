import Link from 'next/link'

interface SectionPillProps {
  name: string
  slug: string
  colorToken: string
  active?: boolean
}

export default function SectionPill({ name, slug, colorToken, active = false }: SectionPillProps) {
  return (
    <Link
      href={`/tienda?category=${slug}`}
      className="inline-flex items-center rounded-pill px-4 py-1.5 text-sm font-sans font-semibold transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
      style={
        active
          ? { backgroundColor: colorToken, color: '#fff' }
          : { backgroundColor: colorToken + '33', color: colorToken }
      }
    >
      {name}
    </Link>
  )
}
