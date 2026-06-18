'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import type { CategoryRoot, AgeStage, Brand, ProductListItem, PaginationMeta } from '@/types/api'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CurrentFilters {
  category: string
  stage: string
  brand: string
  minPrice: string
  maxPrice: string
  sort: string
  page: string
}

interface ShopShellProps {
  filterOptions: { categories: CategoryRoot[]; stages: AgeStage[]; brands: Brand[] }
  currentFilters: CurrentFilters
  products: ProductListItem[]
  meta: PaginationMeta
}

// ---------------------------------------------------------------------------
// ShopShell
// ---------------------------------------------------------------------------

export default function ShopShell({ filterOptions, currentFilters, products, meta }: ShopShellProps) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [localMin, setLocalMin] = useState(currentFilters.minPrice)
  const [localMax, setLocalMax] = useState(currentFilters.maxPrice)

  // Cuántos filtros activos hay (excluye sort y page)
  const activeCount = [
    currentFilters.category,
    currentFilters.stage,
    currentFilters.brand,
    currentFilters.minPrice,
    currentFilters.maxPrice,
  ].filter(Boolean).length

  function navigate(updates: Partial<CurrentFilters & { page?: string }>) {
    const merged = { ...currentFilters, ...updates }
    const params = new URLSearchParams()
    if (merged.category)  params.set('category',  merged.category)
    if (merged.stage)     params.set('stage',      merged.stage)
    if (merged.brand)     params.set('brand',      merged.brand)
    if (merged.minPrice)  params.set('min_price',  merged.minPrice)
    if (merged.maxPrice)  params.set('max_price',  merged.maxPrice)
    if (merged.sort)      params.set('sort',       merged.sort)
    if (updates.page && updates.page !== '1') params.set('page', updates.page)
    router.push(`/tienda?${params.toString()}`)
  }

  function clearAll() {
    setLocalMin('')
    setLocalMax('')
    router.push('/tienda')
  }

  function applyPrice() {
    navigate({ minPrice: localMin, maxPrice: localMax, page: '1' })
    setMobileOpen(false)
  }

  const SORT_OPTIONS = [
    { value: '',           label: 'Relevancia' },
    { value: 'newest',     label: 'Más nuevos' },
    { value: 'price_asc',  label: 'Precio: menor a mayor' },
    { value: 'price_desc', label: 'Precio: mayor a menor' },
    { value: 'featured',   label: 'Destacados' },
  ]

  const FilterContent = (
    <div className="space-y-6">
      {/* Categoría */}
      <FilterGroup title="Categoría">
        <FilterOption
          label="Todas"
          active={!currentFilters.category}
          onClick={() => navigate({ category: '', page: '1' })}
        />
        {filterOptions.categories.map((cat) => (
          <FilterOption
            key={cat.slug}
            label={cat.name}
            active={currentFilters.category === cat.slug}
            colorToken={cat.color_token}
            onClick={() => navigate({ category: cat.slug, page: '1' })}
          />
        ))}
      </FilterGroup>

      {/* Etapa */}
      <FilterGroup title="Etapa del bebé">
        <FilterOption
          label="Todas las etapas"
          active={!currentFilters.stage}
          onClick={() => navigate({ stage: '', page: '1' })}
        />
        {filterOptions.stages.map((s) => (
          <FilterOption
            key={s.slug}
            label={s.name}
            active={currentFilters.stage === s.slug}
            colorToken={s.color_token}
            onClick={() => navigate({ stage: s.slug, page: '1' })}
          />
        ))}
      </FilterGroup>

      {/* Marca */}
      {filterOptions.brands.length > 0 && (
        <FilterGroup title="Marca">
          <FilterOption
            label="Todas"
            active={!currentFilters.brand}
            onClick={() => navigate({ brand: '', page: '1' })}
          />
          {filterOptions.brands.map((b) => (
            <FilterOption
              key={b.slug}
              label={b.name}
              active={currentFilters.brand === b.slug}
              colorToken="#8B8498"
              onClick={() => navigate({ brand: b.slug, page: '1' })}
            />
          ))}
        </FilterGroup>
      )}

      {/* Precio */}
      <FilterGroup title="Precio (CLP)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Mín"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="w-full rounded-card border border-line px-2 py-1.5 text-sm font-sans text-ink focus:border-aqua focus:outline-none"
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            placeholder="Máx"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="w-full rounded-card border border-line px-2 py-1.5 text-sm font-sans text-ink focus:border-aqua focus:outline-none"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 w-full rounded-pill border border-line bg-white py-1.5 text-xs font-semibold font-sans text-ink hover:bg-cream transition"
        >
          Aplicar precio
        </button>
      </FilterGroup>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full rounded-pill py-1.5 text-xs font-sans text-muted hover:text-ink underline"
        >
          Limpiar todos los filtros
        </button>
      )}
    </div>
  )

  return (
    <div>
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="mb-4 flex items-center gap-2">
        {/* Sort — siempre visible */}
        <select
          value={currentFilters.sort}
          onChange={(e) => navigate({ sort: e.target.value, page: '1' })}
          className="rounded-pill border border-line bg-white px-3 py-2 text-sm font-sans text-ink focus:border-aqua focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Resultados */}
        <span className="flex-1 text-sm font-sans text-muted">
          {meta.total} producto{meta.total !== 1 ? 's' : ''}
        </span>

        {/* Botón filtrar — solo mobile */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-1.5 rounded-pill border border-line bg-white px-3 py-2 text-sm font-sans font-semibold text-ink lg:hidden"
        >
          <FilterIcon />
          Filtrar
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Chips de filtros activos ─────────────────────────────────── */}
      {activeCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {currentFilters.category && (
            <FilterChip
              label={filterOptions.categories.find((c) => c.slug === currentFilters.category)?.name ?? currentFilters.category}
              onRemove={() => navigate({ category: '', page: '1' })}
            />
          )}
          {currentFilters.stage && (
            <FilterChip
              label={filterOptions.stages.find((s) => s.slug === currentFilters.stage)?.name ?? currentFilters.stage}
              onRemove={() => navigate({ stage: '', page: '1' })}
            />
          )}
          {currentFilters.brand && (
            <FilterChip
              label={filterOptions.brands.find((b) => b.slug === currentFilters.brand)?.name ?? currentFilters.brand}
              onRemove={() => navigate({ brand: '', page: '1' })}
            />
          )}
          {(currentFilters.minPrice || currentFilters.maxPrice) && (
            <FilterChip
              label={`$${currentFilters.minPrice || '0'} – $${currentFilters.maxPrice || '∞'}`}
              onRemove={() => navigate({ minPrice: '', maxPrice: '', page: '1' })}
            />
          )}
        </div>
      )}

      {/* ── Layout: sidebar + grid ───────────────────────────────────── */}
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-52 shrink-0 lg:block">
          {FilterContent}
        </aside>

        {/* Grid + paginación */}
        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <EmptyState hasFilters={activeCount > 0} onClear={clearAll} />
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Paginación */}
          {meta.last_page > 1 && (
            <Pagination meta={meta} currentFilters={currentFilters} />
          )}
        </div>
      </div>

      {/* ── Mobile bottom sheet ─────────────────────────────────────── */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-card bg-cream px-5 pb-8 pt-4 transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-lg font-bold text-ink">Filtrar</p>
          <button onClick={() => setMobileOpen(false)} className="text-muted hover:text-ink">
            <CloseIcon />
          </button>
        </div>
        {FilterContent}
        <button
          onClick={() => setMobileOpen(false)}
          className="mt-6 w-full rounded-pill bg-rose py-3 font-display font-bold text-white transition hover:opacity-90"
        >
          Ver {meta.total} resultado{meta.total !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-componentes internos
// ---------------------------------------------------------------------------

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold font-display uppercase tracking-wider text-muted">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function FilterOption({
  label, active, colorToken, onClick,
}: {
  label: string; active: boolean; colorToken?: string; onClick: () => void
}) {
  const hasColor = Boolean(colorToken)
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-pill px-3 py-1.5 text-sm font-sans text-left transition ${
        active
          ? hasColor ? 'font-semibold' : 'bg-muted/10 font-semibold text-muted'
          : 'text-ink hover:bg-line'
      }`}
      style={active && hasColor ? { backgroundColor: colorToken + '22', color: colorToken } : {}}
    >
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
          active && hasColor ? '' : active ? 'bg-muted border-muted' : 'border-line'
        }`}
        style={active && hasColor ? { backgroundColor: colorToken, borderColor: colorToken } : {}}
      />
      {label}
    </button>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-line px-3 py-1 text-xs font-sans font-semibold text-ink">
      {label}
      <button onClick={onRemove} aria-label="Quitar filtro" className="text-muted hover:text-rose transition-colors">
        ×
      </button>
    </span>
  )
}

function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="text-5xl">🔍</span>
      <div>
        <p className="font-display text-xl font-bold text-ink">
          {hasFilters ? 'Sin resultados para estos filtros' : 'No hay productos todavía'}
        </p>
        <p className="mt-1 font-sans text-sm text-muted">
          {hasFilters
            ? 'Prueba cambiando o limpiando los filtros.'
            : 'Vuelve pronto, estamos cargando productos.'}
        </p>
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          className="rounded-pill border border-line bg-white px-5 py-2 text-sm font-sans font-semibold text-ink hover:bg-cream transition"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}

function Pagination({ meta, currentFilters }: { meta: PaginationMeta; currentFilters: CurrentFilters }) {
  function pageUrl(p: number) {
    const params = new URLSearchParams()
    if (currentFilters.category) params.set('category', currentFilters.category)
    if (currentFilters.stage)    params.set('stage',    currentFilters.stage)
    if (currentFilters.brand)    params.set('brand',    currentFilters.brand)
    if (currentFilters.minPrice) params.set('min_price', currentFilters.minPrice)
    if (currentFilters.maxPrice) params.set('max_price', currentFilters.maxPrice)
    if (currentFilters.sort)     params.set('sort',     currentFilters.sort)
    if (p > 1) params.set('page', String(p))
    return `/tienda?${params.toString()}`
  }

  const current = meta.current_page
  const last = meta.last_page

  // Genera un array de páginas a mostrar (prev, current-1, current, current+1, next)
  const pages = Array.from({ length: last }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === last || Math.abs(p - current) <= 1,
  )

  return (
    <nav aria-label="Paginación" className="mt-8 flex items-center justify-center gap-1">
      {current > 1 && (
        <Link href={pageUrl(current - 1)} className="paginator-btn">← Anterior</Link>
      )}

      {pages.map((p, i) => {
        const prev = pages[i - 1]
        return (
          <span key={p} className="flex items-center gap-1">
            {prev && p - prev > 1 && <span className="px-1 text-muted">…</span>}
            <Link
              href={pageUrl(p)}
              className={`paginator-btn ${p === current ? 'bg-rose text-white border-rose hover:opacity-90' : ''}`}
            >
              {p}
            </Link>
          </span>
        )
      })}

      {current < last && (
        <Link href={pageUrl(current + 1)} className="paginator-btn">Siguiente →</Link>
      )}
    </nav>
  )
}

// ---------------------------------------------------------------------------
// Íconos
// ---------------------------------------------------------------------------

function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path strokeLinecap="round" d="M3 6h18M7 12h10M11 18h2" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
