import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' })
const sans = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  title: 'Snehapriyan — AI Developer & Web Designer',
  description: 'I build things with AI, code, and curiosity. A personal corner of the internet for thoughtful digital experiences, experiments, and useful little systems.',
  applicationName: 'SP-WEBSITE',
  authors: [{ name: 'Snehapriyan' }],
  openGraph: {
    title: 'Snehapriyan — AI, code, and curiosity.',
    description: 'Thoughtful digital experiences, experiments, and useful little systems. Enter a small digital world.',
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
  themeColor: '#171b17',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
