'use client'
import { create } from 'zustand'
import type { ProductListItem } from '@/types/api'

export interface CartEntry {
  product: ProductListItem
  variantId: number | null
  quantity: number
}

// Formato compacto guardado en cookie httpOnly
export interface CartCookieEntry {
  pId: number
  vId: number | null
  qty: number
  name: string
  slug: string
  price: number
  img: string | null
  clr: string
}

export function entryToCookie(e: CartEntry): CartCookieEntry {
  return {
    pId: e.product.id,
    vId: e.variantId,
    qty: e.quantity,
    name: e.product.name,
    slug: e.product.slug,
    price: e.product.price,
    img: e.product.cover_image_url,
    clr: e.product.category.color_token,
  }
}

export function cookieToEntry(c: CartCookieEntry): CartEntry {
  return {
    product: {
      id: c.pId,
      name: c.name,
      slug: c.slug,
      price: c.price,
      cover_image_url: c.img,
      category: { id: 0, name: '', slug: '', color_token: c.clr, root: { name: '', slug: '' } },
      sku: '',
      short_description: '',
      compare_at_price: null,
      discount_percent: null,
      has_variants: c.vId !== null,
      in_stock: true,
      rating: null,
      reviews_count: 0,
      brand: { name: '', slug: '' },
      age_stages: [],
      featured: false,
    },
    variantId: c.vId,
    quantity: c.qty,
  }
}

function matchEntry(e: CartEntry, productId: number, variantId: number | null) {
  return e.product.id === productId && e.variantId === variantId
}

interface CartStore {
  entries: CartEntry[]
  drawerOpen: boolean

  // Mutaciones
  addItem: (product: ProductListItem, variantId?: number | null) => void
  removeItem: (productId: number, variantId: number | null) => void
  updateQuantity: (productId: number, variantId: number | null, quantity: number) => void
  clearCart: () => void
  setEntries: (entries: CartEntry[]) => void

  // Drawer
  openDrawer: () => void
  closeDrawer: () => void

  // Derivados
  totalCount: () => number
  subtotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  entries: [],
  drawerOpen: false,

  addItem: (product, variantId = null) =>
    set((s) => {
      const exists = s.entries.find((e) => matchEntry(e, product.id, variantId))
      const entries = exists
        ? s.entries.map((e) =>
            matchEntry(e, product.id, variantId) ? { ...e, quantity: e.quantity + 1 } : e,
          )
        : [...s.entries, { product, variantId, quantity: 1 }]
      return { entries, drawerOpen: true }
    }),

  removeItem: (productId, variantId) =>
    set((s) => ({
      entries: s.entries.filter((e) => !matchEntry(e, productId, variantId)),
    })),

  updateQuantity: (productId, variantId, quantity) =>
    set((s) => ({
      entries:
        quantity <= 0
          ? s.entries.filter((e) => !matchEntry(e, productId, variantId))
          : s.entries.map((e) =>
              matchEntry(e, productId, variantId) ? { ...e, quantity } : e,
            ),
    })),

  clearCart: () => set({ entries: [] }),

  setEntries: (entries) => set({ entries }),

  openDrawer: () => set({ drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),

  totalCount: () => get().entries.reduce((sum, e) => sum + e.quantity, 0),
  subtotal: () => get().entries.reduce((sum, e) => sum + e.product.price * e.quantity, 0),
}))
