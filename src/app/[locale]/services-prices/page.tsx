'use client';

import '@/css/services.css';
import Layout from '@/components/layout/Layout';
import ServicesPricesContent from '@/components/ServicesPricesContent';
import { getListSpa } from '@/api/common';
import { useEffect, useState } from 'react';
import { SpaLocation } from '@/types/api';

export default function ServicesPage() {
  const [spaLocations, setSpaLocations] = useState<SpaLocation[]>([]);
  useEffect(() => {
    const fetchSpaLocations = async () => {
      const spaLocationRes = await getListSpa();
      const spaLocations = spaLocationRes?.data || [];
      setSpaLocations(spaLocations);
    };
    fetchSpaLocations();
  }, []);
  
  return (
    <Layout className="services-container" spaLocations={spaLocations}>
      <ServicesPricesContent spaLocations={spaLocations} />
    </Layout>
  );
}