import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import './professional.css'

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' })
const heading = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-heading', display: 'swap' })
const sans = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  title: 'Snehapriyan — Creative Developer & AI Builder',
  description: 'Snehapriyan is an independent creative developer exploring thoughtful web design, AI-powered workflows, and interactive digital experiences.',
  applicationName: 'Snehapriyan',
  authors: [{ name: 'Snehapriyan' }],
  openGraph: {
    title: 'Beyond the Horizon — A Journey North',
    description: 'Thoughtful web design, AI-powered workflows, and interactive digital experiences.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Snehapriyan',
    images: [{ url: '/images/northern-shore.png', width: 1536, height: 1024, alt: 'Atmospheric northern coastline' }],
  },
  twitter: { card: 'summary_large_image', title: 'Beyond the Horizon — A Journey North', description: 'Some journeys are not about conquest. They are about discovering who we truly are.', images: ['/images/northern-shore.png'] },
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
