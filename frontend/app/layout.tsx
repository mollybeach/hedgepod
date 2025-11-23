import type { Metadata, Viewport } from 'next'
import { Inter, Nunito } from 'next/font/google'
import { Providers } from '@/components/Providers'
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider'
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
  metadataBase: new URL('https://hedgepod.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hedgepod.app',
    title: 'HedgePod Agent | Autonomous Cross-Chain DeFi',
    description: 'Deposit once. AI agents automatically rebalance across 8+ chains for optimal yield. Built for 23M World App users.',
    siteName: 'HedgePod Agent',
    images: [
      {
        url: '/hedgepod_mobile_app_preview.png',
        width: 1200,
        height: 630,
        alt: 'HedgePod Agent - Autonomous Cross-Chain DeFi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HedgePod Agent | Autonomous Cross-Chain DeFi',
    description: 'Deposit once. AI agents automatically rebalance across 8+ chains for optimal yield.',
    images: ['/hedgepod_mobile_app_preview.png'],
    creator: '@hedgepod',
    site: '@hedgepod',
  },
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
      <MiniKitProvider appId={process.env.NEXT_PUBLIC_WORLD_APP_ID || ''}>
        <body className={`${inter.variable} ${nunito.variable} font-body antialiased`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </MiniKitProvider>
    </html>
  )
}

