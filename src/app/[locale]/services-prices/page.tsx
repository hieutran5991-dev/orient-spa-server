import '@/css/services.css';
import Layout from '@/components/layout/Layout';
import ServicesPricesContent from '@/components/ServicesPricesContent';
import { getListSpa } from '@/api/common';

export default async function ServicesPage() {
  const spaLocationRes = await getListSpa();
  const spaLocations = spaLocationRes?.data || [];
  console.log(spaLocations);

  return (
    <Layout className="services-container" spaLocations={spaLocations}>
      <ServicesPricesContent spaLocations={spaLocations} />
    </Layout>
  );
}
