'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cart'

export default function SiteHeader() {
  const count = useCartStore((s) => s.totalCount())

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3">
        {/* Desktop: una sola fila */}
        <div className="hidden md:flex items-center gap-4">
          <Logo />
          <div className="flex-1">
            <SearchBar />
          </div>
          <AccountButton />
          <CartButton count={count} />
        </div>

        {/* Mobile: logo + carrito arriba, buscador abajo */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <AccountButton />
              <CartButton count={count} />
            </div>
          </div>
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <Link href="/" className="shrink-0" aria-label="Aguteo Babys — inicio">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="Aguteo Babys" className="h-[7.5rem] w-auto" />
    </Link>
  )
}

function SearchBar() {
  return (
    <div className="relative w-full">
      <input
        type="search"
        placeholder="Busca pañales, compotas, pijamas…"
        className="w-full rounded-pill border border-line bg-white px-4 py-2 text-sm font-sans text-ink placeholder:text-muted focus:border-aqua focus:outline-none"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
        <SearchIcon />
      </span>
    </div>
  )
}

function AccountButton() {
  return (
    <button
      aria-label="Mi cuenta"
      className="flex items-center gap-1 text-xs font-sans text-ink hover:text-rose transition-colors"
    >
      <UserIcon />
      <span className="hidden sm:inline">Cuenta</span>
    </button>
  )
}

function CartButton({ count }: { count: number }) {
  return (
    <Link
      href="/carrito"
      aria-label={`Carrito, ${count} productos`}
      className="relative flex items-center gap-1 text-xs font-sans text-ink hover:text-rose transition-colors"
    >
      <CartIcon />
      <span className="hidden sm:inline">Carrito</span>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-white text-[10px] font-bold font-display">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="m21 21-4.35-4.35" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path strokeLinecap="round" d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
