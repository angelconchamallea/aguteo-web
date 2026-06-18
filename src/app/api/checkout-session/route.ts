import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'aguteo_checkout'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 2, // 2 horas
  path: '/',
}

interface CheckoutSession {
  orderNumber: string
  email: string
}

export async function GET() {
  const cookieStore = await cookies()
  const raw = cookieStore.get(COOKIE_NAME)?.value
  if (!raw) return NextResponse.json({ session: null })
  try {
    return NextResponse.json({ session: JSON.parse(raw) as CheckoutSession })
  } catch {
    return NextResponse.json({ session: null })
  }
}

export async function POST(req: Request) {
  const session = (await req.json()) as CheckoutSession
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, JSON.stringify(session), COOKIE_OPTIONS)
  return res
}
