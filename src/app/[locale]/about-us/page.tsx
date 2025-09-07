import Layout from "@/components/layout/Layout";
import AboutUsContent from "@/components/AboutUsContent";
import "@/css/booking.css";
import { getListSpa } from "@/api/common";

export default async function AboutUsPage() {
  const spaLocationRes = await getListSpa();

  return (
    <Layout spaLocations={spaLocationRes?.data || []}>
      <AboutUsContent />
    </Layout>
  );
}
