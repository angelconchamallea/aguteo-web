'use client'

/**
 * Página de design system — solo desarrollo.
 * Muestra todos los componentes base en sus variantes.
 * Acceder en: http://localhost:3000/design
 */
import { redirect } from 'next/navigation'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import PriceTag from '@/components/ui/PriceTag'
import StageCard from '@/components/ui/StageCard'
import SectionPill from '@/components/ui/SectionPill'
import ProductCard from '@/components/ui/ProductCard'
import type { AgeStage, ProductListItem } from '@/types/api'

export default function DesignPage() {
  if (process.env.NODE_ENV === 'production') redirect('/')

  return (
    <main className="min-h-screen bg-cream p-8 space-y-16">
      <header>
        <h1 className="font-display text-4xl font-bold text-ink">Design System — Aguteo Babys</h1>
        <p className="font-sans text-muted mt-1">Página interna — solo dev</p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* TIPOGRAFÍA                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Tipografía">
        <div className="space-y-3">
          <p className="font-display text-4xl font-bold text-ink">Baloo 2 — H1 / Títulos / Precios</p>
          <p className="font-display text-2xl font-bold text-ink">Baloo 2 — H2</p>
          <p className="font-display text-xl font-semibold text-ink">Baloo 2 — H3</p>
          <p className="font-sans text-base text-ink">Nunito — cuerpo (400)</p>
          <p className="font-sans text-base font-semibold text-ink">Nunito — énfasis (600)</p>
          <p className="font-sans text-sm text-muted">Nunito — texto secundario / muted</p>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* COLORES                                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Paleta de color">
        <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
          {PALETTE.map(({ name, bg, text }) => (
            <div key={name} className="flex flex-col gap-1">
              <div className={`h-12 rounded-card ${bg}`} />
              <span className={`text-xs font-sans font-semibold ${text}`}>{name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
          {SOFT_PAIRS.map(({ name, soft, deep, softClass, deepClass }) => (
            <div key={name} className={`rounded-card p-3 ${softClass}`}>
              <p className={`text-xs font-bold font-display ${deepClass}`}>{name}</p>
              <p className={`text-xs font-sans ${deepClass}`}>soft / deep</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BUTTON                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Button">
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Agregar al carrito</Button>
          <Button variant="primary" size="sm">Comprar</Button>
          <Button variant="primary" size="lg">Pagar con Webpay</Button>
          <Button variant="primary" loading>Procesando...</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-4">
          <Button variant="secondary">Ver más</Button>
          <Button variant="secondary" size="sm">Cancelar</Button>
          <Button variant="secondary" disabled>Deshabilitado</Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-4">
          <Button variant="soft" softColor="#7DD9D4">Ropa Bebé</Button>
          <Button variant="soft" softColor="#A98BE0">Juguetes</Button>
          <Button variant="soft" softColor="#F5A623">Mamá</Button>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* BADGE                                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-4 items-center">
          <Badge variant="nuevo" />
          <Badge variant="descuento" discountPercent={20} />
          <Badge variant="etapa" label="0-3m" colorHex="#7DD9D4" rotate="left" />
          <Badge variant="etapa" label="3-6m" colorHex="#A98BE0" />
          <Badge variant="agotado" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PRICE TAG                                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section title="PriceTag">
        <div className="flex flex-wrap gap-8 items-baseline">
          <PriceTag price={12990} size="sm" />
          <PriceTag price={24990} compareAtPrice={32990} size="md" />
          <PriceTag price={49990} compareAtPrice={65000} size="lg" />
          <PriceTag price={1990} size="md" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION PILL                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section title="SectionPill (barra de categorías)">
        <div className="flex flex-wrap gap-2">
          {MOCK_CATEGORIES.map((c, i) => (
            <SectionPill key={c.slug} name={c.name} slug={c.slug} colorToken={c.color} active={i === 0} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* STAGE CARD                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section title="StageCard">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {MOCK_STAGES.map((s) => (
            <StageCard key={s.slug} stage={s} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PRODUCT CARD                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section title="ProductCard">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {MOCK_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={() => {}} />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* MICROCOPY                                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section title="Microcopy de marca">
        <ul className="space-y-2 font-sans text-sm text-ink list-disc list-inside">
          <li>Carrito vacío: "Tu carrito está vacío 🍼 ¡Vamos a llenarlo de cositas lindas!"</li>
          <li>Agregado al carrito: "¡Agregado! 🧸"</li>
          <li>Compra exitosa: "¡Gracias por tu compra! Tu pedido AGB-000001 va en camino a acompañar a tu bebé."</li>
          <li>Pago fallido: "Algo pasó con el pago y no se completó. No te preocupes, no se hizo ningún cobro. ¿Lo intentamos de nuevo?"</li>
          <li>404: "Ups, esta página se escondió como en el jugo de las escondidas 👶"</li>
          <li>Stock agotado: "Se agotó por ahora 💛"</li>
        </ul>
      </Section>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Sub-componente de sección
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-ink border-b border-line pb-2">{title}</h2>
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Datos mock para la página de design
// ---------------------------------------------------------------------------

const PALETTE = [
  { name: 'rose',      bg: 'bg-rose',      text: 'text-rose-deep' },
  { name: 'aqua',      bg: 'bg-aqua',      text: 'text-aqua-deep' },
  { name: 'sky',       bg: 'bg-sky',       text: 'text-sky-deep' },
  { name: 'lavender',  bg: 'bg-lavender',  text: 'text-lavender-deep' },
  { name: 'tangerine', bg: 'bg-tangerine', text: 'text-tangerine-deep' },
  { name: 'coral',     bg: 'bg-coral',     text: 'text-white' },
  { name: 'butter',    bg: 'bg-butter',    text: 'text-butter-deep' },
  { name: 'blush',     bg: 'bg-blush',     text: 'text-rose-deep' },
  { name: 'cream',     bg: 'bg-cream border border-line', text: 'text-ink' },
  { name: 'ink',       bg: 'bg-ink',       text: 'text-white' },
  { name: 'muted',     bg: 'bg-muted',     text: 'text-white' },
  { name: 'line',      bg: 'bg-line border border-muted/30', text: 'text-ink' },
]

const SOFT_PAIRS = [
  { name: 'aqua',      soft: '#E3F7F5', deep: '#136B66', softClass: 'bg-aqua-soft',      deepClass: 'text-aqua-deep' },
  { name: 'lavender',  soft: '#EFE9FA', deep: '#5A3FA0', softClass: 'bg-lavender-soft',  deepClass: 'text-lavender-deep' },
  { name: 'tangerine', soft: '#FDF1DC', deep: '#8F5A06', softClass: 'bg-tangerine-soft', deepClass: 'text-tangerine-deep' },
  { name: 'rose',      soft: '#FDEAF1', deep: '#9C2C55', softClass: 'bg-rose-soft',      deepClass: 'text-rose-deep' },
  { name: 'sky',       soft: '#E7F0FB', deep: '#1F548F', softClass: 'bg-sky-soft',       deepClass: 'text-sky-deep' },
  { name: 'butter',    soft: '#FBF5DB', deep: '#755F05', softClass: 'bg-butter-soft',    deepClass: 'text-butter-deep' },
]

const MOCK_CATEGORIES = [
  { name: 'Ropa Bebé', slug: 'ropa-bebe', color: '#F8C8D4' },
  { name: 'Alimentación', slug: 'alimentacion', color: '#7DD9D4' },
  { name: 'Cuidado e Higiene', slug: 'cuidado-higiene', color: '#5BA8E8' },
  { name: 'Descanso y Baño', slug: 'descanso-bano', color: '#A98BE0' },
  { name: 'Juguetes', slug: 'juguetes', color: '#EFD75B' },
  { name: 'Mamá', slug: 'mama', color: '#F08080' },
  { name: 'Packs y Regalos', slug: 'packs-regalos', color: '#F5A623' },
]

const MOCK_STAGES: AgeStage[] = [
  { id: 1, name: '0-3 meses', slug: '0-3m', tagline: 'Recién llegado', color_token: '#7DD9D4', min_months: 0, max_months: 3 },
  { id: 2, name: '3-6 meses', slug: '3-6m', tagline: 'Explorando', color_token: '#A98BE0', min_months: 3, max_months: 6 },
  { id: 3, name: '6-12 meses', slug: '6-12m', tagline: 'En movimiento', color_token: '#F5A623', min_months: 6, max_months: 12 },
  { id: 4, name: '12-24 meses', slug: '12-24m', tagline: '¡Caminando!', color_token: '#F08080', min_months: 12, max_months: 24 },
]

const MOCK_PRODUCTS: ProductListItem[] = [
  {
    id: 1, sku: 'ROB-001', name: 'Conjunto ositos manga larga algodón suave bebé',
    slug: 'conjunto-ositos-manga-larga', short_description: 'Algodón peinado 100%',
    price: 12990, compare_at_price: null, discount_percent: null,
    has_variants: true, in_stock: true, rating: null, reviews_count: 0,
    brand: { name: 'Aguteo Babys', slug: 'aguteo-babys' },
    category: { id: 1, name: 'Ropa Bebé', slug: 'ropa-bebe', color_token: '#F8C8D4', root: { name: 'Ropa Bebé', slug: 'ropa-bebe' } },
    age_stages: [{ slug: '0-3m', color_token: '#7DD9D4' }],
    cover_image_url: null, featured: true,
  },
  {
    id: 2, sku: 'ROB-002', name: 'Pijama polar estrellas con pie',
    slug: 'pijama-polar-estrellas', short_description: 'Polar suave, cierre a presión',
    price: 18990, compare_at_price: 24990, discount_percent: 24,
    has_variants: true, in_stock: true, rating: null, reviews_count: 0,
    brand: { name: 'Aguteo Babys', slug: 'aguteo-babys' },
    category: { id: 1, name: 'Ropa Bebé', slug: 'ropa-bebe', color_token: '#F8C8D4', root: { name: 'Ropa Bebé', slug: 'ropa-bebe' } },
    age_stages: [{ slug: '3-6m', color_token: '#A98BE0' }],
    cover_image_url: null, featured: false,
  },
  {
    id: 3, sku: 'ALI-001', name: 'Cuchara silicona autoalimentación etapa 1',
    slug: 'cuchara-silicona-autoalimentacion', short_description: 'BPA free, fácil agarre',
    price: 5990, compare_at_price: null, discount_percent: null,
    has_variants: false, in_stock: false, rating: null, reviews_count: 0,
    brand: { name: 'Amma', slug: 'amma' },
    category: { id: 2, name: 'Alimentación', slug: 'alimentacion', color_token: '#7DD9D4', root: { name: 'Alimentación', slug: 'alimentacion' } },
    age_stages: [{ slug: '6-12m', color_token: '#F5A623' }],
    cover_image_url: null, featured: false,
  },
  {
    id: 4, sku: 'JUG-001', name: 'Sonajero mordedor arcoíris madera natural certificada',
    slug: 'sonajero-mordedor-arcoiris', short_description: 'Madera natural, pinturas no tóxicas',
    price: 9990, compare_at_price: 12990, discount_percent: 23,
    has_variants: false, in_stock: true, rating: null, reviews_count: 0,
    brand: { name: 'Aguteo Babys', slug: 'aguteo-babys' },
    category: { id: 5, name: 'Juguetes', slug: 'juguetes', color_token: '#EFD75B', root: { name: 'Juguetes', slug: 'juguetes' } },
    age_stages: [{ slug: '3-6m', color_token: '#A98BE0' }, { slug: '6-12m', color_token: '#F5A623' }],
    cover_image_url: null, featured: true,
  },
]
