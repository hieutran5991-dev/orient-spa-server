'use client';

import '@/css/home.css';
import Layout from "@/components/layout/Layout";
import HomeContent from "@/components/HomeContent";
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Layout className="home-container">
        <HomeContent />
      </Layout>

      <Script src="/js/common.js" strategy="afterInteractive" />
    </>
  );
}
