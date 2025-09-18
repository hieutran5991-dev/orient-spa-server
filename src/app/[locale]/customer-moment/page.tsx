import "@/css/contact.css";
import React from "react";
import GalleryContent from "@/components/GalleryContent";
import Layout from "@/components/layout/Layout";
import { customerMoments } from "@/lib/galleryData";
import { getListSpa } from "@/api/common";
import type { Metadata } from "next";
import Script from "next/script";
import { DOMAIN_URL } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Customer Moments | SEN SPA Da Nang – Real Experiences & Photos",
  description:
    "See real customer moments at SEN SPA Da Nang: happy smiles, relaxing treatments, and memorable experiences captured in photos and short videos.",
  alternates: {
    canonical: `${DOMAIN_URL}/customer-moment`,
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Customer Moments | SEN SPA Da Nang – Real Experiences & Photos",
    description:
      "Authentic customer moments from SEN SPA Da Nang: images and short clips of relaxing, happy experiences.",
    type: "website",
    url: `${DOMAIN_URL}/customer-moment`,
    images: [
      {
        url: `${DOMAIN_URL}/images/senspa-customer-moment.jpg`,
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Customer Moments",
      },
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Moments | SEN SPA Da Nang – Real Experiences & Photos",
    description:
      "Browse real customer moments in photos and short videos from SEN SPA Da Nang.",
    images: [`${DOMAIN_URL}/images/senspa-customer-moment.jpg`],
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
        <GalleryContent images={customerMoments} isGallery={false} />
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
                name: "Customer Moments",
                item: `${DOMAIN_URL}/customer-moment`,
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
            "@type": "CollectionPage",
            name: "Customer Moments | SEN SPA Da Nang",
            url: `${DOMAIN_URL}/customer-moment`,
            description:
              "A curated collection of authentic customer moments from SEN SPA Da Nang.",
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
              url: `${DOMAIN_URL}/images/senspa-customer-moment.jpg`,
            },
            hasPart: [
              {
                "@type": "ImageObject",
                url: `${DOMAIN_URL}/images/moments/moment-01.jpg`,
                caption: "Couple relaxing in a private room at SEN SPA Da Nang",
                datePublished: "2025-01-15",
                creator: {
                  "@type": "Organization",
                  name: "SEN SPA Da Nang",
                  "@id": `${DOMAIN_URL}/#spa`,
                },
              },
              {
                "@type": "ImageObject",
                url: `${DOMAIN_URL}/images/moments/moment-02.jpg`,
                caption:
                  "Aroma massage – soothing essential oils for deep relaxation",
                datePublished: "2025-02-10",
                creator: {
                  "@type": "Organization",
                  name: "SEN SPA Da Nang",
                  "@id": `${DOMAIN_URL}/#spa`,
                },
              },
              {
                "@type": "VideoObject",
                url: `${DOMAIN_URL}/videos/moments/moment-03.mp4`,
                name: "Hot Stone highlights",
                description:
                  "Short clip capturing relaxing Hot Stone session atmosphere.",
                uploadDate: "2025-03-05",
                thumbnailUrl: `${DOMAIN_URL}/images/moments/moment-03-thumb.jpg`,
                publisher: {
                  "@type": "Organization",
                  name: "SEN SPA Da Nang",
                  "@id": `${DOMAIN_URL}/#spa`,
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
