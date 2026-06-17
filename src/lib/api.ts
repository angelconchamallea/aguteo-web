import type {
  ApiCollection,
  ApiResource,
  ApiError,
  CategoryTree,
  CategoryNode,
  AgeStage,
  Brand,
  ProductListItem,
  ProductListParams,
  ProductDetail,
  Guide,
  ShippingRate,
  CouponValidationBody,
  CouponValidationResult,
  CreateOrderBody,
  CreateOrderResult,
  OrderStatusResult,
} from '@/types/api'

// ---------------------------------------------------------------------------
// Core fetch wrapper
// ---------------------------------------------------------------------------

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost'
const API_BASE = `${BASE_URL}/api/v1`

class ApiException extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiError,
  ) {
    super(body.message)
    this.name = 'ApiException'
  }
}

async function apiFetch<T>(
  path: string,
  init?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T> {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    ...init,
  })

  if (!res.ok) {
    let body: ApiError
    try {
      body = (await res.json()) as ApiError
    } catch {
      body = { message: `Error ${res.status}` }
    }
    throw new ApiException(res.status, body)
  }

  return res.json() as Promise<T>
}

// ---------------------------------------------------------------------------
// Helpers de query string
// ---------------------------------------------------------------------------

function toQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const q = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined) q.set(key, String(val))
  }
  const s = q.toString()
  return s ? `?${s}` : ''
}

// ---------------------------------------------------------------------------
// Catálogo público
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<CategoryTree> {
  const res = await apiFetch<ApiResource<CategoryTree>>('/categories', {
    next: { revalidate: 3600 },
  })
  return res.data
}

export async function getCategory(slug: string): Promise<CategoryNode> {
  const res = await apiFetch<ApiResource<CategoryNode>>(`/categories/${slug}`, {
    next: { revalidate: 3600 },
  })
  return res.data
}

export async function getAgeStages(): Promise<AgeStage[]> {
  const res = await apiFetch<ApiResource<AgeStage[]>>('/age-stages', {
    next: { revalidate: 3600 },
  })
  return res.data
}

export async function getBrands(): Promise<Brand[]> {
  const res = await apiFetch<ApiResource<Brand[]>>('/brands', {
    next: { revalidate: 3600 },
  })
  return res.data
}

export async function getProducts(
  params: ProductListParams = {},
): Promise<ApiCollection<ProductListItem>> {
  const qs = toQueryString(params as Record<string, string | number | boolean | undefined>)
  return apiFetch<ApiCollection<ProductListItem>>(`/products${qs}`, {
    next: { revalidate: 300 },
  })
}

export async function getProduct(slug: string): Promise<ProductDetail> {
  const res = await apiFetch<ApiResource<ProductDetail>>(`/products/${slug}`, {
    next: { revalidate: 300 },
  })
  return res.data
}

export async function getGuides(stageSlug?: string): Promise<ApiCollection<Guide>> {
  const qs = stageSlug ? `?stage=${stageSlug}` : ''
  return apiFetch<ApiCollection<Guide>>(`/guides${qs}`, {
    next: { revalidate: 3600 },
  })
}

export async function getGuide(slug: string): Promise<Guide> {
  const res = await apiFetch<ApiResource<Guide>>(`/guides/${slug}`, {
    next: { revalidate: 3600 },
  })
  return res.data
}

export async function getShippingRates(communeId: number): Promise<ShippingRate[]> {
  const res = await apiFetch<ApiResource<ShippingRate[]>>(
    `/shipping-rates?commune_id=${communeId}`,
    { cache: 'no-store' },
  )
  return res.data
}

// ---------------------------------------------------------------------------
// Checkout (sin caché — siempre dinámico)
// ---------------------------------------------------------------------------

export async function validateCoupon(
  body: CouponValidationBody,
): Promise<CouponValidationResult> {
  const res = await apiFetch<ApiResource<CouponValidationResult>>('/coupons/validate', {
    method: 'POST',
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  return res.data
}

export async function createOrder(body: CreateOrderBody): Promise<CreateOrderResult> {
  const res = await apiFetch<ApiResource<CreateOrderResult>>('/orders', {
    method: 'POST',
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  return res.data
}

export async function getOrderStatus(
  orderNumber: string,
  email: string,
): Promise<OrderStatusResult> {
  const res = await apiFetch<ApiResource<OrderStatusResult>>(
    `/orders/${orderNumber}/status?email=${encodeURIComponent(email)}`,
    { cache: 'no-store' },
  )
  return res.data
}

export { ApiException }
