/** Formatea un entero CLP con separador de miles (punto) sin decimales. Ej: 12990 → "$12.990" */
export function formatCLP(amount: number): string {
  return '$' + amount.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

/**
 * Asegura que una URL de imagen sea absoluta.
 * La API puede devolver rutas relativas (ej. "/storage/products/img.jpg").
 * En ese caso prepende NEXT_PUBLIC_API_URL para construir la URL completa.
 */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost'
  return `${base.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
}
