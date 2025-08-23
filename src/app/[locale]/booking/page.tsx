import '@/css/booking.css'
import Layout from '@/components/layout/Layout';
import BookingContent from '@/components/BookingContent';
import Script from 'next/script';
import {getListProducts, getListSpa} from "@/api/common";
import {SpaLocation} from "@/types/api";

export default async function BookingPage() {
  const products = await getListProducts();
  const spaLocations = await getListSpa() as SpaLocation[];

  return (
    <Layout className="booking-container" spaLocations={spaLocations}>
      <BookingContent products={products}/>
      <Script src="/js/booking.js" strategy="afterInteractive"/>
    </Layout>
  );
}
