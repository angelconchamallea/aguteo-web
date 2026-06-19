import type { Metadata } from 'next'
import { Baloo_2, Nunito } from 'next/font/google'
import './globals.css'
import CartProvider from '@/components/cart/CartProvider'
import CartDrawerLoader from '@/components/cart/CartDrawerLoader'

const baloo = Baloo_2({
  subsets: ['latin'],
  variable: '--font-baloo',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aguteobabys.cl'

export const metadata: Metadata = {
  title: {
    default: 'Aguteo Babys — Tienda de productos para bebés',
    template: '%s | Aguteo Babys',
  },
  description:
    'Ropa, alimentación, juguetes y más para tu bebé de 0 a 24 meses. Fundado por papás de gemelos.',
  metadataBase: new URL(BASE),
  openGraph: {
    siteName: 'Aguteo Babys',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawerLoader />
        </CartProvider>
      </body>
    </html>
  )
}
