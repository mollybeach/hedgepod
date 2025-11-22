import type { Metadata, Viewport } from 'next'
import { Inter, Nunito } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/Providers'
import '../globals.css'

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

const locales = ['en', 'zh', 'es', 'ar', 'pt', 'id', 'fr', 'ja', 'ru', 'de', 'hi', 'ko', 'pl', 'ca', 'ms', 'th', 'zh-TW', 'nl', 'es-419'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${nunito.variable} font-body antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
