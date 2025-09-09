import Layout from "@/components/layout/Layout";
import AboutUsContent from "@/components/AboutUsContent";
import "@/css/booking.css";
import { getListSpa } from "@/api/common";
import { CONFIG, DOMAIN_URL } from "@/utils/constants";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Us | SEN SPA Da Nang – Best Spa Da Nang",
  description: "Learn about SEN SPA Da Nang – a hidden oasis of tranquility where therapists nurture the body, mind, and soul through expert massage therapies.",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: `${DOMAIN_URL}/about-us`,
  },
  openGraph: {
    title: "About Us | SEN SPA Da Nang – Best Spa Da Nang",
    description: "Discover SEN SPA Da Nang, a hidden relaxing oasis where your body, mind, and spirit are pampered by professional therapists.",
    type: "website",
    url: `${DOMAIN_URL}/about-us`,
    images: [
      {
        url: `${DOMAIN_URL}/images/seo/about-us.jpeg`,
        width: 1200,
        height: 630,
        alt: "About SEN SPA Da Nang"
      }
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | SEN SPA Da Nang – Best Spa Da Nang",
    description: "Discover SEN SPA Da Nang, an oasis of tranquility where body, mind, and spirit are pampered by professional therapists.",
    images: [`${DOMAIN_URL}/images/seo/about-us.jpeg`],
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    "ICBM": "16.0648855, 108.2230748",
  },
};

export default async function AboutUsPage() {
  const spaLocationRes = await getListSpa();

  return (
    <>
      <Layout spaLocations={spaLocationRes?.data || []}>
        <AboutUsContent />
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
                "name": "About Us",
                "item": `${DOMAIN_URL}/about-us`
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
            "name": "About Us | SEN SPA Da Nang",
            "url": `${DOMAIN_URL}/about-us`,
            "description": "Learn about SEN SPA Da Nang – a hidden oasis of tranquility where therapists nurture the body, mind, and soul through expert massages.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SEN SPA Da Nang",
              "url": `${DOMAIN_URL}/`
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": `${DOMAIN_URL}/images/seo/about-us.jpeg`
            }
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
            "description": "A hidden relaxing oasis on Thai Phien Street where therapists nurture body, mind and spirit."
          })
        }}
      />

      {/* JSON-LD: About-specific FAQs */}
      <Script
        id="about-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What does the name 'Sen Spa' represent?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our name 'Sen Spa' represents the purity of body, mind, and spirit — inspired by the lotus (Sen), symbolizing tranquility amid the vibrancy of Da Nang."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of experience can I expect at SEN SPA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You'll enjoy a hidden relaxing oasis on Thai Phien Street, where professional therapists use various massage modalities to heal the body, nurture the mind and nourish the soul."
                }
              },
              {
                "@type": "Question",
                "name": "What makes SEN SPA unique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We emphasize holistic relaxation — pampering your body, delighting your taste buds with warm herbal teas, and caring for your soul with service excellence you'll want to return to again and again."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
