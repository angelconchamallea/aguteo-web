import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { CartCookieEntry } from '@/store/cart'

const COOKIE_NAME = 'aguteo_cart'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 días
  path: '/',
}

export async function GET() {
  const cookieStore = await cookies()
  const raw = cookieStore.get(COOKIE_NAME)?.value
  let entries: CartCookieEntry[] = []
  if (raw) {
    try { entries = JSON.parse(raw) } catch { entries = [] }
  }
  return NextResponse.json({ entries })
}

export async function POST(req: Request) {
  const { entries } = (await req.json()) as { entries: CartCookieEntry[] }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, JSON.stringify(entries), COOKIE_OPTIONS)
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', { ...COOKIE_OPTIONS, maxAge: 0 })
  return res
}
