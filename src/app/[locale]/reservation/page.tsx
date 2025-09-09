import '@/css/reservation.css'
import ReservationContent from '@/components/ReservationContent'
import Layout from '@/components/layout/Layout'
import Script from 'next/script'
import { getListSpa } from '@/api/common'
import { CONFIG, DOMAIN_URL } from '@/utils/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Reservation | SEN SPA Da Nang – Book Your Massage Now",
  description: "Reserve your massage at SEN SPA Da Nang. Choose your service, time, and guests. Enjoy 10% off during happy hour from 10 AM to 1 PM. Book now!",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: `${DOMAIN_URL}/reservation`,
  },
  openGraph: {
    title: "Reservation | SEN SPA Da Nang – Book Your Massage Now",
    description: "Reserve your massage online at SEN SPA Da Nang. Select service, time, and guest numbers. Don't miss 10% happy hour discount (10 AM–1 PM)!",
    type: "website",
    url: `${DOMAIN_URL}/reservation`,
    images: [
      {
        url: `${DOMAIN_URL}/images/seo/reservation.jpeg`,
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Reservation"
      }
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reservation | SEN SPA Da Nang – Book Your Massage Now",
    description: "Select your massage, time, and guest count. 10% off happy hour 10 AM–1 PM. Reserve now!",
    images: [`${DOMAIN_URL}/images/seo/reservation.jpeg`],
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    "ICBM": "16.0648855, 108.2230748",
  },
};

export default async function ReservationPage() {
  const spaLocations = await getListSpa()

  return (
    <>
      <Layout spaLocations={spaLocations?.data || []}>
        <ReservationContent spaLocations={spaLocations?.data || []} />
        <Script src='/js/service.js' strategy='afterInteractive' />
      </Layout>

      {/* JSON-LD: Breadcrumbs */}
      <Script
        id="breadcrumbs-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${DOMAIN_URL}/`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Reservation",
                "item": `${DOMAIN_URL}/reservation`
              }
            ]
          })
        }}
      />

      {/* JSON-LD: ReserveAction (Appointment Booking) */}
      <Script
        id="reserveaction-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ReserveAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${DOMAIN_URL}/reservation`,
              "actionPlatform": ["http://schema.org/WebPage"]
            },
            "agent": {
              "@type": "Person"
            },
            "object": {
              "@type": "Service",
              "name": "Spa Reservation",
              "provider": {"@id": `${DOMAIN_URL}/#spa`}
            }
          })
        }}
      />

      {/* JSON-LD: WebPage Schema */}
      <Script
        id="webpage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Reservation | SEN SPA Da Nang",
            "url": `${DOMAIN_URL}/reservation`,
            "description": "Reserve your massage service by selecting your preferred service type, time slot, and number of guests. Enjoy a happy-hour discount when booking between 10 AM and 1 PM.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SEN SPA Da Nang",
              "url": `${DOMAIN_URL}/`
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": `${DOMAIN_URL}/images/seo/reservation.jpeg`
            }
          })
        }}
      />

      {/* JSON-LD: Reservation-specific FAQs */}
      <Script
        id="reservation-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can I reserve a massage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Select your service, choose date/time and number of guests, then submit the form or contact us via phone or email."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a discount during happy hour?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, enjoy a 10% discount on all services when you book between 10 AM and 1 PM."
                }
              },
              {
                "@type": "Question",
                "name": "Can I book for multiple guests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can choose the number of guests (up to 10) in the booking form."
                }
              },
              {
                "@type": "Question",
                "name": "What if I want to change my reservation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Please contact us at ${CONFIG.PHONE_WITH_COUNTRY_CODE} or email ${CONFIG.MAIL} as soon as possible to modify your booking.`
                }
              },
              {
                "@type": "Question",
                "name": "What happens if I don't show up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No-show fees may apply. Please inform us in advance if you're unable to make your appointment."
                }
              }
            ]
          })
        }}
      />
    </>
  )
}
