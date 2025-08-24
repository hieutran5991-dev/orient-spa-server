import '@/css/promotion.css';
import Layout from '@/components/layout/Layout';
import PromotionsContent from '@/components/PromotionsContent';

export default function PromotionsPage() {
  return (
    <Layout>
      <main className="main-content">
        <PromotionsContent />
      </main>
    </Layout>
  );
}
