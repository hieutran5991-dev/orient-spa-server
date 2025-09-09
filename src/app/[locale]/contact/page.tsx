import "@/css/contact.css";
import Layout from "@/components/layout/Layout";
import ContactContent from "@/components/ContactContent";
import { getListSpa } from "@/api/common";
import { CONFIG, DOMAIN_URL } from "@/utils/constants";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact SEN SPA Da Nang | Book Massage – Best Spa Da Nang",
  description: "Contact SEN SPA Da Nang to book your massage. Phone +84 976 591 515 • senspa.dn@gmail.com • 21 Thai Phien Street, Hai Chau, Da Nang. Open daily 10:00–21:00.",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: `${DOMAIN_URL}/contact`,
  },
  openGraph: {
    title: "Contact SEN SPA Da Nang | Book Massage – Best Spa Da Nang",
    description: "Call, email or visit SEN SPA Da Nang to book your massage: +84 976 591 515 • senspa.dn@gmail.com • 21 Thai Phien Street. Open daily 10:00–21:00.",
    type: "website",
    url: `${DOMAIN_URL}/contact`,
    images: [
      {
        url: `${DOMAIN_URL}/images/seo/contact-us.jpeg`,
        width: 1200,
        height: 630,
        alt: "Contact SEN SPA Da Nang"
      }
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SEN SPA Da Nang | Book Massage – Best Spa Da Nang",
    description: "Phone, email & address to book at SEN SPA Da Nang. Open daily 10:00–21:00.",
    images: [`${DOMAIN_URL}/images/seo/contact-us.jpeg`],
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    "ICBM": "16.0648855, 108.2230748",
  },
};

export default async function ContactPage() {
  const spaLocationRes = await getListSpa();
  return (
    <>
      <Layout
        className="contact-container"
        spaLocations={spaLocationRes?.data || []}
      >
        <ContactContent />
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
                "name": "Contact",
                "item": `${DOMAIN_URL}/contact`
              }
            ]
          })
        }}
      />

      {/* JSON-LD: ContactPage Schema */}
      <Script
        id="contactpage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact | SEN SPA Da Nang",
            "url": `${DOMAIN_URL}/contact`,
            "about": {"@id": `${DOMAIN_URL}/#spa`},
            "description": "Contact details and booking information for SEN SPA Da Nang.",
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": `${DOMAIN_URL}/images/seo/contact-us.jpeg`
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "SEN SPA Da Nang",
              "url": `${DOMAIN_URL}/`
            }
          })
        }}
      />

      {/* JSON-LD: Spa Entity with ContactPoint */}
      <Script
        id="spa-contactpoint-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Spa",
            "@id": `${DOMAIN_URL}/#spa`,
            "name": CONFIG.SPA_NAME,
            "url": `${DOMAIN_URL}/`,
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "contactType": "Reservations",
                "telephone": CONFIG.PHONE_WITH_COUNTRY_CODE,
                "email": CONFIG.MAIL,
                "availableLanguage": ["en", "vi", "ja", "ko"],
                "areaServed": "Da Nang",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "10:00",
                  "closes": "21:00"
                }
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District",
              "addressLocality": "Da Nang",
              "addressCountry": "VN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 16.0648855,
              "longitude": 108.2230748
            },
            "sameAs": [
              "https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9",
              "https://www.facebook.com/profile.php?id=61554952904145",
              "https://www.instagram.com/senspadanang21"
            ]
          })
        }}
      />

      {/* JSON-LD: Contact-specific FAQs */}
      <Script
        id="contact-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can I book a massage at SEN SPA Da Nang?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `You can call ${CONFIG.PHONE_WITH_COUNTRY_CODE}, email ${CONFIG.MAIL}, or send us a message on Facebook/Instagram to reserve your preferred time.`
                }
              },
              {
                "@type": "Question",
                "name": "What are your opening hours?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are open daily from 10:00 AM to 09:00 PM."
                }
              },
              {
                "@type": "Question",
                "name": "Do you accept last-minute bookings or walk-ins?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Walk-ins are welcome when available. For weekends and peak hours, we recommend booking in advance to secure your slot."
                }
              },
              {
                "@type": "Question",
                "name": "Which languages do your staff speak?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our team can assist in English and Vietnamese; Japanese and Korean support is available subject to staff schedule."
                }
              },
              {
                "@type": "Question",
                "name": "Where is SEN SPA located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are at 21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang — a short ride from Dragon Bridge and the Han River."
                }
              },
              {
                "@type": "Question",
                "name": "What payment methods do you accept?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We accept cash and major credit/debit cards."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
