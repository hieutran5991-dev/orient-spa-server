import '@/css/services.css';
import Layout from '@/components/layout/Layout';
import ServicesPricesContent from '@/components/ServicesPricesContent';
import { getListCategories, getListProducts, getListSpa } from '@/api/common';
import Script from 'next/script';
import { CONFIG, DOMAIN_URL } from '@/utils/constants';
import { Metadata } from 'next';
import { getJSFileWithCacheBusting } from '@/utils/cacheBusting';

export const metadata: Metadata = {
  title: "Massage Menu & Prices | SEN SPA Da Nang – Best Spa Da Nang",
  description: "See SEN SPA Da Nang's full massage menu & prices: aroma, hot stone, Thai stretch (no oil), foot massage, couple rooms. Book the best spa in Da Nang today.",
  keywords: "best spa da nang, da nang massage, spa menu, spa prices da nang, couple massage da nang, aroma massage da nang, hot stone da nang",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: `${DOMAIN_URL}/menu-prices`,
  },
  openGraph: {
    title: "Massage Menu & Prices | SEN SPA Da Nang – Best Spa Da Nang",
    description: "Explore our full spa menu and prices in Da Nang: aroma, hot stone, Thai stretch, foot massage, couple massage. Book now.",
    type: "website",
    url: `${DOMAIN_URL}/menu-prices`,
    images: [
      {
        url: `${DOMAIN_URL}/images/seo/menu.jpeg`,
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Menu & Prices"
      }
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage Menu & Prices | SEN SPA Da Nang – Best Spa Da Nang",
    description: "See our full service menu & prices. Luxury treatments for couples & families in Da Nang.",
    images: [`${DOMAIN_URL}/images/seo/menu.jpeg`],
  },
};

export default async function ServicesPage() {
  const spaLocations= await getListSpa();
  const categories = await getListCategories();
  const products = await getListProducts();

  return (
    <>
      <Layout className="services-container" spaLocations={spaLocations?.data || []}>
        <ServicesPricesContent spaLocations={spaLocations?.data || []} categories={categories?.data || []} products={products?.data || []} />
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
                "name": "Services & Prices",
                "item": `${DOMAIN_URL}/menu-prices`
              }
            ]
          })
        }}
      />

      {/* JSON-LD: Spa Entity Reference */}
      <Script
        id="spa-entity-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Spa",
            "@id": `${DOMAIN_URL}/#spa`,
            "name": CONFIG.SPA_NAME,
            "url": `${DOMAIN_URL}/`,
            "image": `${DOMAIN_URL}/images/senspa-danang.jpg`,
            "telephone": CONFIG.PHONE_WITH_COUNTRY_CODE,
            "email": CONFIG.MAIL,
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
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
              "opens": "10:00",
              "closes": "21:00"
            }
          })
        }}
      />

      {/* JSON-LD: Services ItemList */}
      <Script
        id="services-itemlist-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "SEN SPA Da Nang – Services & Prices",
            "url": `${DOMAIN_URL}/menu-prices`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "Aroma Massage",
                  "description": "Full-body aroma oil massage for relaxation and stress relief.",
                  "provider": {"@id": `${DOMAIN_URL}/#spa`},
                  "areaServed": "Da Nang",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "VND",
                    "price": "XXX000",
                    "availability": "https://schema.org/InStock",
                    "url": `${DOMAIN_URL}/menu-prices`
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "Hot Stone Massage",
                  "description": "Heated basalt stones combined with gentle techniques to ease muscle tension.",
                  "provider": {"@id": `${DOMAIN_URL}/#spa`},
                  "areaServed": "Da Nang",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "VND",
                    "price": "XXX000",
                    "availability": "https://schema.org/InStock",
                    "url": `${DOMAIN_URL}/menu-prices`
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Service",
                  "name": "Thai Stretch (No Oil)",
                  "description": "Traditional Thai techniques focusing on stretching and pressure points (no oil).",
                  "provider": {"@id": `${DOMAIN_URL}/#spa`},
                  "areaServed": "Da Nang",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "VND",
                    "price": "XXX000",
                    "availability": "https://schema.org/InStock",
                    "url": `${DOMAIN_URL}/menu-prices`
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Service",
                  "name": "Back & Shoulder Massage",
                  "description": "Targeted treatment for back, neck, and shoulder tension.",
                  "provider": {"@id": `${DOMAIN_URL}/#spa`},
                  "areaServed": "Da Nang",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "VND",
                    "price": "XXX000",
                    "availability": "https://schema.org/InStock",
                    "url": `${DOMAIN_URL}/menu-prices`
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Service",
                  "name": "Foot Massage",
                  "description": "Reflexology-inspired foot massage to improve circulation and relaxation.",
                  "provider": {"@id": `${DOMAIN_URL}/#spa`},
                  "areaServed": "Da Nang",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "VND",
                    "price": "XXX000",
                    "availability": "https://schema.org/InStock",
                    "url": `${DOMAIN_URL}/menu-prices`
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 6,
                "item": {
                  "@type": "Service",
                  "name": "Couple Massage (Private Room)",
                  "description": "Side-by-side massage in a private room — perfect for couples and families.",
                  "provider": {"@id": `${DOMAIN_URL}/#spa`},
                  "areaServed": "Da Nang",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "VND",
                    "price": "XXX000",
                    "availability": "https://schema.org/InStock",
                    "url": `${DOMAIN_URL}/menu-prices`
                  }
                }
              }
            ]
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
            "name": "Services & Prices | SEN SPA Da Nang",
            "url": `${DOMAIN_URL}/menu-prices`,
            "description": "Browse the full massage & spa menu with transparent prices at SEN SPA Da Nang.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SEN SPA Da Nang",
              "url": `${DOMAIN_URL}/`
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": `${DOMAIN_URL}/images/seo/menu.jpeg`
            }
          })
        }}
      />

      <Script src={getJSFileWithCacheBusting('service.js')} strategy="afterInteractive" />
    </>
  );
}
