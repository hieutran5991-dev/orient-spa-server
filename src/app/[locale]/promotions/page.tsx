import '@/css/promotion.css';
import Layout from '@/components/layout/Layout';
import PromotionsContent from '@/components/PromotionsContent';
import { getListProducts } from "@/api/common";
export default async function PromotionsPage() {
  const productRes = await getListProducts({is_promoted: true});

  return (
    <Layout>
        <PromotionsContent products={productRes?.data || []}/>
    </Layout>
  );
}
