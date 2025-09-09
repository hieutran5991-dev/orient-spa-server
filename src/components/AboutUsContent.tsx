"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import type { NamespaceKeys } from "use-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import {ABOUT_US_IMAGES, CONFIG} from "@/utils/constants";

const AboutUsContent = () => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <div className="tw:min-h-screen">
        <div className="tw:bg-[var(--main-color)] tw:font-[MtdValkySemibold] tw:text-white tw:py-[30px]">
          <div className="tw:mx-auto tw:px-4 tw:text-center tw:text-4xl tw:md:text-[4.8rem] tw:uppercase">
            {tCommon("aboutUs.title")}
          </div>
        </div>

        <section className="tw:max-w-[1210px] tw:mx-auto">
          <h2 className="tw:text-[3rem] tw:font-bold tw:text-center tw:pt-[2em]">
            {tCommon("aboutUs.welcomeTitle")}
          </h2>

          <div className="tw:px-4 tw:py-8">
            <p className="tw:text-[16px] tw:leading-relaxed tw:text-gray-800 tw:text-justify tw:space-y-6 tw:mb-12">
              {tCommon("aboutUs.introText")}
            </p>

            <div className="tw:w-full">
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="tw:rounded-lg tw:overflow-hidden tw:md:h-[600px] tw:h-[40vh] tw:mb-4"
              >
                {ABOUT_US_IMAGES.map((image) => (
                  <SwiperSlide key={image.id}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
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
                        width={200}
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

          <div className="tw:px-4 tw:pb-4">
            <div className="tw:text-center tw:space-y-6">
              <p className="tw:text-[16px] tw:leading-relaxed tw:text-gray-800 tw:text-justify">
                {tCommon("aboutUs.mission")}
              </p>
            </div>
          </div>

          <div className="tw:bg-white tw:pt-8 tw:border-b tw:border-[#f7f3ef]">
            <div className="tw:mx-auto tw:px-4">
              <div className="tw:rounded-lg tw:overflow-hidden tw:shadow-lg tw:w-full tw:mb-8">
                <iframe
                  src={CONFIG.MAP_LOCATION}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="tw:flex tw:md:items-center tw:gap-4 tw:md:tw:gap-8 tw:text-gray-600 tw:flex-col tw:md:flex-row tw:md:justify-between tw:py-8">
                <div>
                  <a
                    href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                    target="_blank"
                    rel="nofollow"
                  >
                    <div className="tw:flex tw:items-center tw:gap-2">
                      <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                        <i className="fa fa-map-marker tw:text-white tw:text-[17px]" />
                      </div>
                      <span
                        className="hoverable-link"
                        style={{ fontSize: "14px", color: "#333" }}
                      >
                        {CONFIG.SPA_LOCATION}
                      </span>
                    </div>
                  </a>
                </div>

                <div className="tw:flex tw:items-center tw:gap-2">
                  <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                    <i className="fa fa-clock-o tw:text-white tw:text-[17px]" />
                  </div>
                  <span className="">
                    {tCommon("aboutUs.businessInfo.hours")}
                  </span>
                </div>

                <div className="tw:flex tw:items-center tw:gap-2">
                  <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                    <i className="fa fa-phone tw:text-white tw:text-[17px]" />
                  </div>
                  <span style={{ fontSize: "14px", color: "#333" }}>
                    {tCommon('aboutUs.businessInfo.enquiry')} {" "}
                    <a href={`tel:${CONFIG.PHONE_WITH_COUNTRY_CODE}`}>
                      {CONFIG.PHONE_NUMBER}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="tw:mt-14 tw:mb-18 tw:text-center">
            <a
              href="/services-price"
              className="btn tw:bg-[var(--main-color)] tw:text-white tw:hover:bg-[var(--hover-color)] tw:text-2xl tw:md:text-3xl tw:md:w-[300px] tw:w-[220px] tw:h-[50px] tw:md:h-[60px]"
            >
              {tCommon("common.bookNow")}
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUsContent;
