"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import type { NamespaceKeys } from "use-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ABOUT_US_IMAGES } from "@/constants/aboutUs";
import { MAP_CONFIG } from "@/constants/map";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

const AboutUsContent = () => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <div className="tw:min-h-screen tw:bg-gray-50">
        {/* Hero Section with Title */}
        <div className="tw:bg-[var(--main-color)] tw:font-[MtdValkySemibold] tw:text-white tw:py-[30px]">
          <div className="tw:mx-auto tw:px-4 tw:text-center tw:text-4xl tw:md:text-[4.8rem] tw:uppercase">
            {tCommon("aboutUs.title")}
          </div>
        </div>

        <section className="tw:max-w-[1210px] tw:mx-auto">
          <h2 className="tw:text-[2em] tw:font-bold tw:text-[var(--main-color)]">
            {tCommon("aboutUs.welcomeTitle")}
          </h2>

          <div className="tw:px-4 tw:py-16">
            <div className="tw:w-full">
              {/* Main Slider */}
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="tw:rounded-lg tw:overflow-hidden tw:md:h-[600px] tw:h-[40vh] tw:mb-4"
              >
                {ABOUT_US_IMAGES.map((image) => (
                  <SwiperSlide key={image.id}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="tw:w-full tw:h-full tw:object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="tw:relative">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={4}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  navigation={{
                    nextEl: ".swiper-button-next-thumb",
                    prevEl: ".swiper-button-prev-thumb",
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="tw:h-[100px] tw:md:h-[210px] thumb-swiper "
                >
                  {ABOUT_US_IMAGES.map((image) => (
                    <SwiperSlide key={`thumb-${image.id}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={100}
                        height={200}
                        className="tw:w-full tw:h-full tw:object-cover tw:rounded tw:cursor-pointer tw:hover:opacity-100 tw:transition-all tw:duration-300 tw:border-2 tw:border-transparent"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="swiper-button-prev-thumb tw:absolute tw:left-4 tw:top-1/2 tw:-translate-y-1/2 tw:z-10 tw:w-12 tw:h-12 tw:bg-white tw:bg-opacity-80 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:shadow-md tw:cursor-pointer tw:hover:bg-opacity-100 tw:transition-all">
                  <svg
                    className="tw:w-8 tw:h-8 tw:text-[#9e2265]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="swiper-button-next-thumb tw:absolute tw:right-4 tw:top-1/2 tw:-translate-y-1/2 tw:z-10 tw:w-12 tw:h-12 tw:bg-white tw:bg-opacity-80 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:shadow-md tw:cursor-pointer tw:hover:bg-opacity-100 tw:transition-all">
                  <svg
                    className="tw:w-8 tw:h-8 tw:text-[#9e2265]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="tw:px-4 tw:pb-16">
            <div className="tw:text-center tw:space-y-6">
              <p className="tw:text-[16px] tw:leading-relaxed tw:text-gray-800 tw:text-justify">
                {tCommon("aboutUs.mission")}
              </p>

              <div className="tw:mt-8">
                <a
                  href="/reservation"
                  className="btn tw:bg-[var(--main-color)] tw:text-white tw:hover:bg-[var(--hover-color)] tw:text-xl tw:px-8 tw:py-3 tw:rounded-lg tw:inline-block tw:transition-colors"
                >
                  {tCommon("common.bookNow")}
                </a>
              </div>
            </div>
          </div>

          <div className="tw:bg-white tw:py-16">
            <div className="tw:max-w-6xl tw:mx-auto tw:px-4">
              {/* Map */}
              <div className="tw:h-[400px] tw:rounded-lg tw:overflow-hidden tw:shadow-lg tw:w-full tw:mb-8">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1234567890123!2d${MAP_CONFIG.center.lng}!3d${MAP_CONFIG.center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzE2LjAiTiAxMDjCsDEyJzA4LjAiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Orient Spa & Nails Location"
                />
              </div>

              {/* Business Info - Horizontal Layout */}
              <div className="tw:flex tw:flex-wrap tw:justify-center tw:items-center tw:gap-4 tw:md:tw:gap-8 tw:text-center tw:text-sm tw:text-gray-600">
                <div className="tw:flex tw:items-center tw:gap-2 tw:whitespace-nowrap">
                  <svg
                    className="tw:w-4 tw:h-4 tw:text-[#9e2265] tw:flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="tw:text-xs tw:md:tw:text-sm">
                  {tCommon("aboutUs.businessInfo.address")}
                </span>
                  <a
                    href="#"
                    className="tw:text-[#9e2265] tw:underline tw:text-xs tw:md:tw:text-sm"
                  >
                    {tCommon("aboutUs.businessInfo.showOnMap")}
                  </a>
                </div>

                <div className="tw:flex tw:items-center tw:gap-2 tw:whitespace-nowrap">
                  <svg
                    className="tw:w-4 tw:h-4 tw:text-[#9e2265] tw:flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="tw:text-xs tw:md:tw:text-sm">
                  {tCommon("aboutUs.businessInfo.hours")}
                </span>
                </div>

                <div className="tw:flex tw:items-center tw:gap-2 tw:whitespace-nowrap">
                  <svg
                    className="tw:w-4 tw:h-4 tw:text-[#9e2265] tw:flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="tw:text-xs tw:md:tw:text-sm">
                  {tCommon("aboutUs.businessInfo.enquiry")}{" "}
                    {tCommon("aboutUs.businessInfo.phone")}
                </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUsContent;
