"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, Controller } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { GalleryImage } from "@/lib/galleryData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { NamespaceKeys } from "use-intl";

interface GalleryModalProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  images,
  isOpen,
  onClose,
  initialIndex,
}) => {
  const t = useTranslations("gallery" as NamespaceKeys<string, string>);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setActiveIndex(initialIndex);
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(initialIndex);
    }
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(initialIndex);
    }
  }, [initialIndex, thumbsSwiper]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const closeModal = () => {
    setThumbsSwiper(null);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (mainSwiperRef.current) {
            mainSwiperRef.current.slidePrev();
          }
          break;
        case "ArrowRight":
          if (mainSwiperRef.current) {
            mainSwiperRef.current.slideNext();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleThumbnailClick = (index: number) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
    setActiveIndex(index);
  };

  return (
    <div className="tw:fixed tw:inset-0 tw:bg-black tw:bg-opacity-90 tw:flex tw:justify-center tw:items-center tw:z-[99999] tw:flex-col">
      <button
        onClick={closeModal}
        className="tw:absolute tw:top-8 tw:right-6 tw:bg-white tw:bg-opacity-90 tw:border-none
          tw:w-12 tw:h-12 tw:rounded-full tw:cursor-pointer tw:flex tw:items-center tw:justify-center tw:text-3xl tw:text-gray-800 tw:hover:text-[var(--main-color)] tw:z-[1001]"
        aria-label={t("modal.close")}
      >
        ×
      </button>
      <div className="tw:relative tw:max-w-[90%] tw:max-h-[80%] tw:rounded-lg tw:overflow-hidden modal-enter-active tw:mb-4 tw:h-[90%]">
        <div className="tw:w-full tw:h-full">
          <Swiper
            modules={[Navigation, Thumbs, Controller]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            initialSlide={initialIndex}
            onSlideChange={handleSlideChange}
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            className="tw:h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={400}
                  className="tw:max-w-full tw:object-contain tw:h-full tw:mx-auto"
                  priority={index === initialIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="swiper-button-prev-custom tw:absolute tw:top-1/2 tw:-translate-y-1/2 tw:left-5 tw:bg-white tw:bg-opacity-90 tw:border-none tw:w-12 tw:h-12 tw:rounded-full tw:cursor-pointer tw:flex tw:items-center tw:justify-center tw:text-4xl tw:text-gray-800 tw:hover:text-[var(--main-color)] tw:z-[1001]"
            aria-label={t("modal.previous")}
          >
            ‹
          </button>

          <button
            className="swiper-button-next-custom tw:absolute tw:top-1/2 tw:-translate-y-1/2 tw:right-5 tw:bg-white tw:bg-opacity-90 tw:border-none tw:w-12 tw:h-12 tw:rounded-full tw:cursor-pointer tw:flex tw:items-center tw:justify-center tw:text-4xl tw:text-gray-800 tw:hover:text-[var(--main-color)] tw:z-[1001]"
            aria-label={t("modal.next")}
          >
            ›
          </button>
        </div>
      </div>

      <div className="tw:w-full tw:px-12 tw:max-w-[90%]">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          initialSlide={initialIndex}
          onSwiper={setThumbsSwiper}
          className="thumbnail-swiper !tw:w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`thumb-${image.id}`} className="tw:md:w-36 tw:md:h-36">
              <button
                onClick={() => handleThumbnailClick(index)}
                className={`tw:w-full tw:h-full tw:border-2 tw:transition-all tw:cursor-pointer tw:rounded-md tw:overflow-hidden ${
                  index === activeIndex
                    ? "tw:border-white tw:opacity-100 tw:scale-110"
                    : "tw:border-gray-600 tw:opacity-60 hover:tw:opacity-80 hover:tw:scale-105"
                }`}
                aria-label={`Go to image ${index + 1}: ${image.alt}`}
                aria-current={index === activeIndex ? "true" : "false"}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={120}
                  className="tw:w-full tw:h-full tw:object-contain"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GalleryModal;
