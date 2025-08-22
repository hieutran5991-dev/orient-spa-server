import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css";
import Script from "next/script";
import { SUPPORTED_LANGUAGE, type Locale } from '@/utils/constants';

export const metadata: Metadata = {
  title: "Orient Spa Hanoi",
  description: "A relaxing escape for all your senses, in the heart of Hanoi.",
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGE.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!SUPPORTED_LANGUAGE.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script src="/js/lib.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
