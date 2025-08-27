import '@/css/contact.css';
import React from 'react';
import GalleryContent from '@/components/GalleryContent';
import Layout from "@/components/layout/Layout";

export default function GalleryPage() {
    return (
        <Layout className="contact-container">
            <GalleryContent />
        </Layout>
    )
}
