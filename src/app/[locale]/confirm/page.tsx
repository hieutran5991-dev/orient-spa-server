import "@/css/booking.css";
import Layout from "@/components/layout/Layout";
import ConfirmContent from "@/components/ConfirmContent";
import { getListSpa } from "@/api/common";

export default async function ConfirmPage() {
  const spaLocationRes = await getListSpa();

  return (
    <Layout
      className="booking-container"
      spaLocations={spaLocationRes?.data || []}
    >
      <ConfirmContent />
    </Layout>
  );
}
