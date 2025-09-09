import "@/css/services.css";
import Layout from "@/components/layout/Layout";
import FeaturedProductsContent from "@/components/FeaturedProductsContent";
import { getListProducts, getListSpa } from "@/api/common";
import Script from "next/script";
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
      <Script src="/js/service.js" strategy="afterInteractive" />
    </>
  );
}
