// Shapes exactos del contrato API-SPEC.md — no modificar sin actualizar el spec primero.

// ---------------------------------------------------------------------------
// Respuestas envolventes
// ---------------------------------------------------------------------------

export interface ApiCollection<T> {
  data: T[]
  meta: PaginationMeta
}

export interface ApiResource<T> {
  data: T
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

// ---------------------------------------------------------------------------
// Categorías
// ---------------------------------------------------------------------------

export interface CategoryChild {
  id: number
  name: string
  slug: string
  depth: number
  children: CategoryChild[]
}

export interface CategoryRoot extends CategoryChild {
  color_token: string
  icon: string
}

/** Árbol completo — respuesta de GET /categories */
export type CategoryTree = CategoryRoot[]

/** Nodo individual con breadcrumb — respuesta de GET /categories/{slug} */
export interface CategoryNode {
  id: number
  name: string
  slug: string
  depth: number
  color_token: string
  breadcrumb: BreadcrumbItem[]
  children: CategoryChild[]
}

export interface BreadcrumbItem {
  name: string
  slug: string
}

// ---------------------------------------------------------------------------
// Etapas de edad
// ---------------------------------------------------------------------------

export interface AgeStage {
  id: number
  name: string
  slug: string
  tagline: string
  color_token: string
  min_months: number
  max_months: number
}

// ---------------------------------------------------------------------------
// Marcas
// ---------------------------------------------------------------------------

export interface Brand {
  id: number
  name: string
  slug: string
  logo_url: string | null
}

// ---------------------------------------------------------------------------
// Productos
// ---------------------------------------------------------------------------

export interface ProductCategoryRef {
  id: number
  name: string
  slug: string
  color_token: string
  root: { name: string; slug: string }
}

/** Category shape en el detalle de producto — incluye breadcrumb completo */
export interface ProductDetailCategoryRef extends ProductCategoryRef {
  breadcrumb: BreadcrumbItem[]
}

export interface ProductAgeStageRef {
  slug: string
  color_token: string
}

/** Item de listado — respuesta de GET /products */
export interface ProductListItem {
  id: number
  sku: string
  name: string
  slug: string
  short_description: string
  price: number
  compare_at_price: number | null
  discount_percent: number | null
  has_variants: boolean
  in_stock: boolean
  rating: number | null
  reviews_count: number
  brand: { name: string; slug: string }
  category: ProductCategoryRef
  age_stages: ProductAgeStageRef[]
  cover_image_url: string | null
  featured: boolean
}

export interface ProductImage {
  url: string
  alt_text: string
}

export interface ProductVariant {
  id: number
  size: string | null
  color: string | null
  sku: string
  stock: number
  price: number
}

export interface RelatedGuide {
  title: string
  slug: string
}

/** Detalle completo — respuesta de GET /products/{slug} */
export interface ProductDetail extends Omit<ProductListItem, 'category'> {
  description: string
  images: ProductImage[]
  variants: ProductVariant[]
  tags: string[]
  related_guides: RelatedGuide[]
  category: ProductDetailCategoryRef
}

// ---------------------------------------------------------------------------
// Guías
// ---------------------------------------------------------------------------

export interface Guide {
  id: number
  title: string
  slug: string
  excerpt: string
  body: string
  cover_image_url: string | null
  age_stage: AgeStage
  products: ProductListItem[]
}

// ---------------------------------------------------------------------------
// Envíos
// ---------------------------------------------------------------------------

export interface ShippingRate {
  id: number
  name: string
  price: number
  free_from_amount: number
  estimated_days: string
}

// ---------------------------------------------------------------------------
// Cupones
// ---------------------------------------------------------------------------

export type CouponType = 'percentage' | 'fixed'

export interface CouponValidationResult {
  code: string
  type: CouponType
  value: number
  discount_amount: number
}

export interface CouponValidationBody {
  code: string
  subtotal: number
  items: Array<{ product_id: number; quantity: number }>
}

// ---------------------------------------------------------------------------
// Checkout / Órdenes
// ---------------------------------------------------------------------------

export interface OrderCustomer {
  name: string
  email: string
  phone: string
}

export interface OrderShippingAddress {
  region_id: number
  commune_id: number
  street: string
  number: string
  apartment?: string
  notes?: string
}

export interface OrderItem {
  product_id: number
  product_variant_id: number | null
  quantity: number
}

export interface CreateOrderBody {
  customer: OrderCustomer
  shipping_address: OrderShippingAddress
  shipping_rate_id: number
  coupon_code?: string
  items: OrderItem[]
}

export interface CreateOrderResult {
  order_number: string
  webpay: {
    url: string
    token: string
  }
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled'

export interface OrderStatusResult {
  order_number: string
  status: OrderStatus
  total: number
  items: OrderStatusItem[]
  paid_at: string | null
}

export interface OrderStatusItem {
  name: string
  quantity: number
  unit_price: number
  subtotal: number
}

// ---------------------------------------------------------------------------
// Query params de GET /products
// ---------------------------------------------------------------------------

export type ProductSortOption = 'newest' | 'price_asc' | 'price_desc' | 'featured'

export interface ProductListParams {
  category?: string
  stage?: string
  brand?: string
  min_price?: number
  max_price?: number
  featured?: boolean
  search?: string
  sort?: ProductSortOption
  page?: number
  per_page?: number
}
