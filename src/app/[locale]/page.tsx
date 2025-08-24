import '@/css/home.css';
import Layout from "@/components/layout/Layout";
import HomeContent from "@/components/HomeContent";
import Script from 'next/script';
import {getListSpa} from "@/api/common";

export default async function Home() {
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
