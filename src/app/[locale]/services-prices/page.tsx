'use client';

import '@/css/services.css';
import Layout from '@/components/layout/Layout';
import ServicesPricesContent from '@/components/ServicesPricesContent';

export default function ServicesPage() {
  return (
    <Layout className="services-container">
      <ServicesPricesContent />
    </Layout>
  );
}