import '@/css/services.css';
import Layout from '@/components/layout/Layout';
import ServicesPricesContent from '@/components/ServicesPricesContent';
import { getListCategories, getListProducts, getListSpa } from '@/api/common';
import Script from 'next/script';

export default async function ServicesPage() {
  const spaLocations= await getListSpa();
  const categories = await getListCategories();
  const products = await getListProducts();

  return (
    <>
      <Layout className="services-container" spaLocations={spaLocations?.data || []}>
        <ServicesPricesContent spaLocations={spaLocations?.data || []} categories={categories?.data || []} products={products?.data || []} />
      </Layout>
      <Script src="/js/service.js" strategy="afterInteractive" />
    </>
  );
}
