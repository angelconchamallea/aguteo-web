'use client'
import { create } from 'zustand'
import type { ProductListItem } from '@/types/api'

interface CartEntry {
  product: ProductListItem
  quantity: number
}

interface CartStore {
  entries: CartEntry[]
  addItem: (product: ProductListItem) => void
  totalCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  entries: [],
  addItem: (product) =>
    set((s) => {
      const existing = s.entries.find((e) => e.product.id === product.id)
      if (existing) {
        return {
          entries: s.entries.map((e) =>
            e.product.id === product.id ? { ...e, quantity: e.quantity + 1 } : e,
          ),
        }
      }
      return { entries: [...s.entries, { product, quantity: 1 }] }
    }),
  totalCount: () => get().entries.reduce((sum, e) => sum + e.quantity, 0),
}))
