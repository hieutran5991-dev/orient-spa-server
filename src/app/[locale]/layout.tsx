import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import Script from 'next/script'
import {SUPPORTED_LANGUAGE, type Locale, CONFIG} from '@/utils/constants'

export const metadata: Metadata = {
  title: CONFIG.SPA_NAME,
  description: 'In need of relaxation and pleasant, set foot into Sen Spa Da Nang and feel the stress of the day fly away! Our spa treatments will take care of your body, bring you relaxing hours in a peaceful scent with skillful therapists. Let’s your body talk and we listen!',
  keywords: 'Sen Spa, Spa Da Nang, Sen Spa Da Nang'
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
        {/* Google Tag Manager */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NKBS8VTP');
          `}
        </script>
        {/* End Google Tag Manager */}

        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel='stylesheet' href='/css/style.css' />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKBS8VTP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          >
          </iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <Script src='/js/lib.js' strategy='afterInteractive'/>

        <div className="ntc"></div>
        <div className="ntc-success"></div>
      </body>
    </html>
  )
}
