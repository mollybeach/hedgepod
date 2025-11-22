import type { Metadata, Viewport } from 'next'
import { Inter, Nunito } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'HedgePod Agent | Autonomous Cross-Chain DeFi',
  description: 'Deposit once. AI agents automatically rebalance across 8+ chains for optimal yield.',
  icons: {
    icon: '/hedgepod-logo.png',
    shortcut: '/hedgepod-logo.png',
    apple: '/hedgepod-logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/hedgepod-logo.png',
    },
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#299f29',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${nunito.variable} font-body antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

