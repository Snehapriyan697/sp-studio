import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' })
const heading = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-heading', display: 'swap' })
const sans = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  title: 'Beyond the Horizon — A Journey North',
  description: 'An atmospheric journey through northern landscapes, quiet philosophy, and the horizon beyond.',
  applicationName: 'SP-WEBSITE',
  authors: [{ name: 'Snehapriyan' }],
  openGraph: {
    title: 'Beyond the Horizon — A Journey North',
    description: 'Some journeys are not about conquest. They are about discovering who we truly are.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Snehapriyan',
    images: [{ url: '/images/northern-shore.png', width: 1536, height: 1024, alt: 'A quiet northern coastline and a warmly lit cabin' }],
  },
  twitter: { card: 'summary_large_image', title: 'Snehapriyan — AI, code, and curiosity.', images: ['/images/northern-shore.png'] },
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101112',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${heading.variable} ${sans.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
