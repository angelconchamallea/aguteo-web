'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/types/api'

interface ProductGalleryProps {
  images: ProductImage[]
  coverUrl: string | null
  productName: string
  categoryColorHex: string
}

export default function ProductGallery({
  images,
  coverUrl,
  productName,
  categoryColorHex,
}: ProductGalleryProps) {
  // Construye lista: imágenes de galería ó cover como fallback
  const allImages: ProductImage[] =
    images.length > 0
      ? images
      : coverUrl
      ? [{ url: coverUrl, alt_text: productName }]
      : []

  const [active, setActive] = useState(0)
  const current = allImages[active]

  const softBg = categoryColorHex + '22'

  return (
    <div className="flex flex-col gap-3">
      {/* Imagen principal */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-card"
        style={{ backgroundColor: softBg }}
      >
        {current ? (
          <Image
            src={current.url}
            alt={current.alt_text || productName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
            🧸
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-card border-2 transition ${
                i === active ? 'border-rose' : 'border-line hover:border-muted'
              }`}
              style={{ backgroundColor: softBg }}
            >
              <Image
                src={img.url}
                alt={img.alt_text || `Imagen ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
