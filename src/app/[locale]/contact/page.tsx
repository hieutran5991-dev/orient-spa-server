import "@/css/contact.css";
import Layout from "@/components/layout/Layout";
import ContactContent from "@/components/ContactContent";
import { getListSpa } from "@/api/common";

export default async function ContactPage() {
  const spaLocationRes = await getListSpa();
  return (
    <Layout
      className="contact-container"
      spaLocations={spaLocationRes?.data || []}
    >
      <ContactContent />
    </Layout>
  );
}
