'use client';

import '@/css/featured-products.css';
import Layout from '@/components/layout/Layout';
import FeaturedProductDetailContent from '@/components/FeaturedProductDetailContent';
import { useParams } from 'next/navigation';
import { getProductDetail } from '@/api/common';
import { notFound } from 'next/navigation';

export default async function FeaturedProductsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const productRes = await getProductDetail(slug);

  if (!productRes?.data) {
    notFound();
  }

  return (
    <Layout>
      <main className="main-content">
        <FeaturedProductDetailContent product={productRes?.data} />
      </main>
    </Layout>
  );
}
