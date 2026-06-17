import {
  getCategories,
  getAgeStages,
  getProducts,
  getGuides,
  getBrands,
} from '@/lib/api'

import Topbar from '@/components/home/Topbar'
import SiteHeader from '@/components/home/SiteHeader'
import CategoryBar from '@/components/home/CategoryBar'
import HeroSection from '@/components/home/HeroSection'
import GuaranteeStrip from '@/components/home/GuaranteeStrip'
import StageGrid from '@/components/home/StageGrid'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import OfferBanner from '@/components/home/OfferBanner'
import PacksSection from '@/components/home/PacksSection'
import MiniGuideBlock from '@/components/home/MiniGuideBlock'
import BrandStrip from '@/components/home/BrandStrip'
import FounderBlock from '@/components/home/FounderBlock'
import SiteFooter from '@/components/home/SiteFooter'

export const revalidate = 300

export default async function HomePage() {
  const [categories, ageStages, featuredResult, packsResult, guidesResult, brands] =
    await Promise.all([
      getCategories().catch(() => []),
      getAgeStages().catch(() => []),
      getProducts({ featured: true, per_page: 8 }).catch(() => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 8, total: 0 } })),
      getProducts({ category: 'packs-regalos', per_page: 3 }).catch(() => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 3, total: 0 } })),
      getGuides().catch(() => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 } })),
      getBrands().catch(() => []),
    ])

  const featuredProducts = featuredResult.data
  const packs = packsResult.data
  const firstGuide = guidesResult.data[0] ?? null

  return (
    <>
      {/* 1. Topbar */}
      <Topbar />

      {/* 2. Header sticky */}
      <SiteHeader />

      {/* 3. Barra de categorías */}
      <CategoryBar categories={categories} />

      {/* 4. Hero compuesto */}
      <HeroSection />

      {/* 5. Tira de garantías */}
      <GuaranteeStrip />

      {/* 6. Etapas del bebé */}
      <StageGrid stages={ageStages} />

      {/* 7. Explora por categoría */}
      <CategoryGrid categories={categories} />

      {/* 8. Favoritos de las mamás */}
      <FeaturedProducts products={featuredProducts} />

      {/* 9. Banner de oferta */}
      <OfferBanner />

      {/* 10. Packs */}
      <PacksSection packs={packs} />

      {/* 11. Mini-guía */}
      <MiniGuideBlock guide={firstGuide} />

      {/* 12. Franja de marcas */}
      <BrandStrip brands={brands} />

      {/* 13. Historia papás de gemelos + newsletter */}
      <FounderBlock />

      {/* 14. Footer */}
      <SiteFooter />
    </>
  )
}
