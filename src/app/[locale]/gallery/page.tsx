import '@/css/contact.css';
import React from 'react';
import GalleryContent from '@/components/GalleryContent';
import Layout from "@/components/layout/Layout";
import {galleryImages} from "@/lib/galleryData";
import {getListSpa} from "@/api/common";

export default async function GalleryPage() {
    const spaLocationRes= await getListSpa();

    return (
        <Layout className="contact-container" spaLocations={spaLocationRes?.data || []}>
            <GalleryContent images={galleryImages} isGallery/>
        </Layout>
    )
}
