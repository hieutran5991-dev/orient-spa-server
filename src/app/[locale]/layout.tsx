import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import Script from 'next/script'
import {SUPPORTED_LANGUAGE, type Locale, CONFIG} from '@/utils/constants'

export const metadata: Metadata = {
  title: CONFIG.SPA_NAME,
  description: 'In need of relaxation and pleasant, set foot into Sen Spa Da Nang and feel the stress of the day fly away! Our spa treatments will take care of your body, bring you relaxing hours in a peaceful scent with skillful therapists. Let’s your body talk and we listen!'
}

export function generateStaticParams() {
  return SUPPORTED_LANGUAGE.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!SUPPORTED_LANGUAGE.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel='stylesheet' href='/css/style.css' />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <Script src='/js/lib.js' strategy='afterInteractive' />
      </body>
    </html>
  )
}
