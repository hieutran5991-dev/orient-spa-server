import "@/css/home.css";
import Layout from "@/components/layout/Layout";
import HomeContent from "@/components/HomeContent";
import Script from "next/script";
import { getListProducts, getListSpa } from "@/api/common";

export default async function Home() {
  const spaLocationRes = await getListSpa();
  const spaLocations = spaLocationRes?.data || [];

  const productRes = await getListProducts();
  const products = productRes?.data || [];

  return (
    <>
      <Layout className="home-container" spaLocations={spaLocations}>
        <HomeContent spaLocations={spaLocations} products={products} />
      </Layout>

      <Script src="/js/common.js" strategy="afterInteractive" />
    </>
  );
}
