"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { galleryImages } from "@/lib/galleryData";
import GalleryModal from "./GalleryModal";
import { NamespaceKeys } from "use-intl";

const GalleryContent: React.FC = () => {
  const t = useTranslations("gallery" as NamespaceKeys<string, string>);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(0);
  };

  return (
    <>
      <div className="tw:min-h-screen tw:font-sans tw:p-5">
        <div className="tw:max-w-[1210px] tw:mx-auto tw:bg-white tw:rounded-lg tw:p-8">
          <div className="tw:text-center tw:mb-10">
            <h1 className="tw:text-4xl tw:md:text-5xl tw:lg:text-6xl tw:text-gray-800 tw:font-bold">
              {t("title")}
            </h1>
          </div>

          <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:xl:grid-cols-4 tw:gap-5">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="tw:relative tw:rounded-lg tw:overflow-hidden tw:cursor-pointer tw:transition-transform tw:duration-300 tw:shadow-md hover:tw:shadow-xl hover:tw:-translate-y-1"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={300}
                  className="tw:w-full tw:h-80 tw:object-cover"
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
