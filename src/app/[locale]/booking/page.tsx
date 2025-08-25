import '@/css/booking.css'
import Layout from '@/components/layout/Layout';
import BookingContent from '@/components/BookingContent';
import Script from 'next/script';
import { getListProducts, getListSpa } from "@/api/common";

export default async function BookingPage() {
  const productRes = await getListProducts();
  const spaLocationRes= await getListSpa();

  return (
    <Layout className="booking-container" spaLocations={spaLocationRes?.data || []}>
      <BookingContent products={productRes?.data || []}/>
      <Script src="/js/booking.js" strategy="afterInteractive"/>
    </Layout>
  );
}
