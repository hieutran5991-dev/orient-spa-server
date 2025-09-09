'use client';

import '@/css/promotion-detail.css';
import Layout from '@/components/layout/Layout';
import PromotionDetailContent from '@/components/PromotionDetailContent';
import { useParams } from 'next/navigation';

export default function PromotionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <Layout>
      <main className="main-content">
        <PromotionDetailContent slug={slug} />
      </main>
    </Layout>
  );
}
