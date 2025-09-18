import "@/css/contact.css";
import React from "react";
import GalleryContent from "@/components/GalleryContent";
import Layout from "@/components/layout/Layout";
import { galleryImages } from "@/lib/galleryData";
import { getListSpa } from "@/api/common";
import type { Metadata } from "next";
import Script from "next/script";
import { DOMAIN_URL } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Gallery | SEN SPA Da Nang – Photos of Our Spa & Treatments",
  description:
    "Explore SEN SPA Da Nang's gallery: interior, private couple rooms, and treatment highlights. See why we are rated among the best spas in Da Nang.",
  alternates: {
    canonical: `${DOMAIN_URL}/gallery`,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Gallery | SEN SPA Da Nang – Photos of Our Spa & Treatments",
    description:
      "View our spa interiors, couple rooms and treatment highlights in the SEN SPA Da Nang gallery.",
    type: "website",
    url: `${DOMAIN_URL}/gallery`,
    images: [
      {
        url: `${DOMAIN_URL}/images/senspa-gallery-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Gallery",
      },
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | SEN SPA Da Nang – Photos of Our Spa & Treatments",
    description:
      "See our gallery of interiors, private rooms and massage highlights.",
    images: [`${DOMAIN_URL}/images/senspa-gallery-cover.jpg`],
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    ICBM: "16.0648855, 108.2230748",
  },
};

export default async function GalleryPage() {
  const spaLocationRes = await getListSpa();

  return (
    <>
      <Layout
        className="contact-container"
        spaLocations={spaLocationRes?.data || []}
      >
        <GalleryContent images={galleryImages} isGallery />
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
                name: "Gallery",
                item: `${DOMAIN_URL}/gallery`,
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: ImageGallery */}
      <Script
        id="image-gallery-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Gallery | SEN SPA Da Nang",
            url: `${DOMAIN_URL}/gallery`,
            description:
              "A curated gallery of SEN SPA Da Nang: spa interiors, couple rooms, and treatment highlights.",
            isPartOf: {
              "@type": "WebSite",
              name: "SEN SPA Da Nang",
              url: `${DOMAIN_URL}/`,
            },
            about: {
              "@id": `${DOMAIN_URL}/#spa`,
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: `${DOMAIN_URL}/images/senspa-gallery-cover.jpg`,
            },
            hasPart: [
              {
                "@type": "ImageObject",
                url: `${DOMAIN_URL}/images/gallery/interior-01.jpg`,
                caption: "Reception & tea corner at SEN SPA Da Nang",
              },
              {
                "@type": "ImageObject",
                url: `${DOMAIN_URL}/images/gallery/couple-room-01.jpg`,
                caption: "Private couple room set up for side-by-side massage",
              },
              {
                "@type": "ImageObject",
                url: `${DOMAIN_URL}/images/gallery/treatment-01.jpg`,
                caption: "Aroma therapy session highlight",
              },
              {
                "@type": "ImageObject",
                url: `${DOMAIN_URL}/images/gallery/hot-stone-01.jpg`,
                caption:
                  "Hot Stone massage — soothing warmth for muscle relief",
              },
            ],
          }),
        }}
      />
    </>
  );
}
