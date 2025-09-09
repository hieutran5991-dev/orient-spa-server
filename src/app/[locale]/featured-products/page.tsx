import "@/css/services.css";
import Layout from "@/components/layout/Layout";
import FeaturedProductsContent from "@/components/FeaturedProductsContent";
import { getListProducts, getListSpa } from "@/api/common";
import Script from "next/script";
import { CONFIG, DOMAIN_URL } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Spa Packages | SEN SPA Da Nang – Best Spa Da Nang",
  description:
    "Explore SEN SPA Da Nang's featured spa products & packages: signature massages, couple rooms & seasonal offers. Experience the best spa in Da Nang.",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: `${DOMAIN_URL}/featured-products`,
  },
  openGraph: {
    title: "Featured Spa Packages | SEN SPA Da Nang – Best Spa Da Nang",
    description:
      "Discover featured spa services, signature treatments and special packages at SEN SPA Da Nang.",
    type: "website",
    url: `${DOMAIN_URL}/featured-products`,
    images: [
      {
        url: `${DOMAIN_URL}/images/seo/products.jpg`,
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Featured Products",
      },
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Spa Packages | SEN SPA Da Nang – Best Spa Da Nang",
    description: "Highlighted spa services & packages at SEN SPA Da Nang.",
    images: [`${DOMAIN_URL}/images/seo/products.jpg`],
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    ICBM: "16.0648855, 108.2230748",
  },
};
export default async function FeaturedProductsPage() {
  const spaLocationRes = await getListSpa();
  const productRes = await getListProducts();

  return (
    <>
      <Layout spaLocations={spaLocationRes?.data || []}>
        <FeaturedProductsContent
          spaLocations={spaLocationRes?.data || []}
          products={productRes?.data || []}
        />
      </Layout>

      {/* JSON-LD: Breadcrumbs */}
      <Script
        id="breadcrumbs-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${DOMAIN_URL}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Featured Products",
                item: `${DOMAIN_URL}/featured-products`,
              },
            ],
          }),
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
            name: "Featured Products | SEN SPA Da Nang",
            url: `${DOMAIN_URL}/featured-products`,
            description:
              "Highlighted spa services, packages and seasonal offers at SEN SPA Da Nang.",
            isPartOf: {
              "@type": "WebSite",
              name: "SEN SPA Da Nang",
              url: `${DOMAIN_URL}/`,
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: `${DOMAIN_URL}/images/seo/products.jpg`,
            },
          }),
        }}
      />

      {/* JSON-LD: Featured Products ItemList */}
      <Script
        id="featured-products-itemlist-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Featured Spa Products",
            url: `${DOMAIN_URL}/featured-products`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Service",
                  name: "Signature Aroma Therapy",
                  description:
                    "A SEN SPA signature aroma massage with premium essential oils.",
                  provider: { "@id": `${DOMAIN_URL}/#spa` },
                  areaServed: "Da Nang",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Service",
                  name: "Couple Room Deluxe Package",
                  description:
                    "Private couple massage room with complimentary herbal tea.",
                  provider: { "@id": `${DOMAIN_URL}/#spa` },
                  areaServed: "Da Nang",
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Service",
                  name: "Hot Stone Detox Session",
                  description:
                    "Heated stone massage to relieve muscle stress and improve circulation.",
                  provider: { "@id": `${DOMAIN_URL}/#spa` },
                  areaServed: "Da Nang",
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Featured Products FAQs */}
      <Script
        id="featured-products-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What are SEN SPA's featured products?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our featured products are signature spa services and packages carefully curated by our therapists, including Aroma Therapy, Hot Stone Detox and Couple Room Deluxe.",
                },
              },
              {
                "@type": "Question",
                name: "Are featured products seasonal?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our featured list may include seasonal offers and packages, updated regularly.",
                },
              },
              {
                "@type": "Question",
                name: "Can I book featured products online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can reserve any featured product online through our Reservation page.",
                },
              },
            ],
          }),
        }}
      />

      <Script src="/js/service.js" strategy="afterInteractive" />
    </>
  );
}
