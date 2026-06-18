'use client'

import { useEffect, useRef } from 'react'
import { useCartStore, cookieToEntry, entryToCookie } from '@/store/cart'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const setEntries = useCartStore((s) => s.setEntries)
  const entries = useCartStore((s) => s.entries)
  const hydrated = useRef(false)

  // Hidrata el store desde la cookie httpOnly al montar
  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then(({ entries: raw }) => {
        if (Array.isArray(raw) && raw.length > 0) {
          setEntries(raw.map(cookieToEntry))
        }
        hydrated.current = true
      })
      .catch(() => { hydrated.current = true })
  }, [setEntries])

  // Sincroniza cambios al store → cookie (no sincroniza la hidratación inicial)
  useEffect(() => {
    if (!hydrated.current) return
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries: entries.map(entryToCookie) }),
    }).catch(() => {})
  }, [entries])

  return <>{children}</>
}
