'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs, Controller } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { GalleryImage } from '@/lib/galleryData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
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
    initialIndex
}) => {
    const t = useTranslations('gallery' as NamespaceKeys<string, string>);
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
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0px';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen]);

    const closeModal = () => {
        setThumbsSwiper(null);
        onClose();
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) return;

            switch (event.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    if (mainSwiperRef.current) {
                        mainSwiperRef.current.slidePrev();
                    }
                    break;
                case 'ArrowRight':
                    if (mainSwiperRef.current) {
                        mainSwiperRef.current.slideNext();
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
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
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[99999] flex-col">
            <div className="relative max-w-[90%] max-h-[70%] bg-white rounded-lg overflow-hidden modal-enter-active mb-4">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-5 bg-white bg-opacity-90 border-none w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-xl text-gray-800 hover:bg-white z-[1001]"
                    aria-label={t('modal.close')}
                >
                    ×
                </button>

                {/* Main Image Swiper */}
                <div className="w-full max-w-3xl h-auto">
                    <Swiper
                        modules={[Navigation, Thumbs, Controller]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        initialSlide={initialIndex}
                        onSlideChange={handleSlideChange}
                        onSwiper={(swiper) => {
                            mainSwiperRef.current = swiper;
                        }}
                        className="main-swiper"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={image.id}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto"
                                    priority={index === initialIndex}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-5 bg-white bg-opacity-90 border-none w-12 h-12 rounded-full cursor-pointer flex items-center justify-center text-2xl text-gray-800 hover:bg-white z-[1001]"
                        aria-label={t('modal.previous')}
                    >
                        ‹
                    </button>

                    <button
                        className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-5 bg-white bg-opacity-90 border-none w-12 h-12 rounded-full cursor-pointer flex items-center justify-center text-2xl text-gray-800 hover:bg-white z-[1001]"
                        aria-label={t('modal.next')}
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Thumbnail Swiper */}
            <div className="w-full max-w-4xl px-4">
                <Swiper
                    modules={[Navigation, FreeMode]}
                    spaceBetween={8}
                    slidesPerView="auto"
                    freeMode={true}
                    watchSlidesProgress={true}
                    initialSlide={initialIndex}
                    onSwiper={setThumbsSwiper}
                    className="thumbnail-swiper !w-full"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={`thumb-${image.id}`} className="!w-16 !h-16">
                            <button
                                onClick={() => handleThumbnailClick(index)}
                                className={`w-full h-full border-2 transition-all cursor-pointer rounded-md overflow-hidden ${index === activeIndex
                                    ? 'border-white opacity-100 scale-110'
                                    : 'border-gray-600 opacity-60 hover:opacity-80 hover:scale-105'
                                    }`}
                                aria-label={`Go to image ${index + 1}: ${image.alt}`}
                                aria-current={index === activeIndex ? 'true' : 'false'}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
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
