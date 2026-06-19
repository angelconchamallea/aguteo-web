import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * POST /api/revalidate
 * Llamado desde Filament (aguteo-api) al guardar productos o guías.
 * Body: { secret: string, tag?: string, path?: string }
 *
 * Tags disponibles: 'products', 'product-{slug}', 'guides', 'guide-{slug}'
 * Paths: cualquier ruta de Next.js, ej: '/tienda', '/guias'
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET not configured' }, { status: 500 })
  }

  let body: { secret?: string; tag?: string; path?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const revalidated: string[] = []

  if (body.tag) {
    revalidateTag(body.tag)
    revalidated.push(`tag:${body.tag}`)
  }

  if (body.path) {
    revalidatePath(body.path, 'layout')
    revalidated.push(`path:${body.path}`)
  }

  if (revalidated.length === 0) {
    return NextResponse.json({ error: 'Provide at least one of: tag, path' }, { status: 400 })
  }

  return NextResponse.json({ revalidated, timestamp: new Date().toISOString() })
}
