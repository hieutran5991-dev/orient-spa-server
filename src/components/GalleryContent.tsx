'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { galleryImages } from '@/lib/galleryData';
import GalleryModal from './GalleryModal';
import { NamespaceKeys } from "use-intl";

const GalleryContent: React.FC = () => {
    const t = useTranslations('gallery' as NamespaceKeys<string, string>);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageIndex(0)
    };

    return (
        <>
            <div className="min-h-screen font-sans p-5">
                <div className="max-w-[1210px] mx-auto bg-white rounded-lg p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 font-bold">
                            {t('title')}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {galleryImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                                onClick={() => handleImageClick(index)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={600}
                                    height={300}
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <GalleryModal
                images={galleryImages}
                isOpen={isModalOpen}
                onClose={closeModal}
                initialIndex={selectedImageIndex}
            />
        </>
    );
};

export default GalleryContent;
