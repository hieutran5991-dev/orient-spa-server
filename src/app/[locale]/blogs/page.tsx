import Layout from "@/components/layout/Layout";
import "@/css/booking.css";
import { getListSpa } from "@/api/common";
import BlogsContent from "@/components/BlogsContent";

export default async function AboutUsPage() {
  const spaLocationRes = await getListSpa();

  return (
    <Layout spaLocations={spaLocationRes?.data || []}>
      <BlogsContent />
    </Layout>
  );
}
