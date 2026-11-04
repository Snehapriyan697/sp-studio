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
  title: 'CODEBOUND / ASCENSION — Learn Python & C++ Through Quests',
  description: 'Enter a coding RPG. Learn Python and C++ through interactive lessons, code challenges, quests, and XP progression.',
  applicationName: 'CODEBOUND / ASCENSION',
  authors: [{ name: 'Snehapriyan' }],
  openGraph: {
    title: 'CODEBOUND / ASCENSION — Learn to Code. Become Legend.',
    description: 'A gamified coding academy for learning Python and C++ through quests and hands-on challenges.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CODEBOUND / ASCENSION',

  },
  twitter: { card: 'summary', title: 'CODEBOUND / ASCENSION — Learn to Code. Become Legend.', description: 'A gamified coding academy for learning Python and C++ through quests and hands-on challenges.' },
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
