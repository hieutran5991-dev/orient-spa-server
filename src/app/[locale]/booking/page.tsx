import '@/css/booking.css'
import Layout from '@/components/layout/Layout';
import BookingContent from '@/components/BookingContent';
import Script from 'next/script';
import { getListProducts, getListSpa } from "@/api/common";
import { DOMAIN_URL } from '@/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Booking | SEN SPA Da Nang",
  description: "Booking endpoint for SEN SPA Da Nang. This page redirects to the homepage.",
  robots: "noindex, nofollow, noarchive, nosnippet, max-image-preview:none, max-video-preview:-1, max-snippet:-1",
  alternates: {
    canonical: `${DOMAIN_URL}/`,
  },
  openGraph: {
    title: "SEN SPA Da Nang",
    description: "Redirecting to SEN SPA Da Nang.",
    type: "website",
    url: `${DOMAIN_URL}/`,
    images: [
      {
        url: `${DOMAIN_URL}/images/seo/booking.jpeg`,
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang"
      }
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEN SPA Da Nang",
    description: "Redirecting to SEN SPA Da Nang.",
    images: [`${DOMAIN_URL}/images/seo/booking.jpeg`],
  },
  other: {
    "googlebot": "noindex, nofollow, noarchive",
  },
};

export default async function BookingPage() {
  const productRes = await getListProducts();
  const spaLocationRes= await getListSpa();

  return (
    <Layout className="booking-container" spaLocations={spaLocationRes?.data || []}>
      <BookingContent products={productRes?.data || []}/>
      <Script src="/js/booking.js" strategy="afterInteractive"/>
    </Layout>
  );
}
