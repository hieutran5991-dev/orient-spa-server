import '@/css/home.css';
import Layout from "@/components/layout/Layout";
import HomeContent from "@/components/HomeContent";
import Script from 'next/script';
import type { Locale } from '@/utils/constants';
import {getListSpa} from "@/api/common";
import {SpaLocation} from "@/types/api";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Home({ params }: HomePageProps) {
  const spaLocationRes = await getListSpa();
  const spaLocations = spaLocationRes?.data || [];

  return (
    <>
      <Layout className="home-container" spaLocations={spaLocations}>
        <HomeContent spaLocations={spaLocations} />
      </Layout>

      <Script src="/js/common.js" strategy="afterInteractive" />
    </>
  );
}
