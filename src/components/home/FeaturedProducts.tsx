"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
// import Image from "next/image";
import type { NamespaceKeys } from "use-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "@/types/common";
import { CURRENCY } from "@/utils/constants";
import { formatPriceWithCurrency } from "@/utils/format";
import BookingForm from "../BookingForm";
import { SpaLocation } from "@/types/api";

const FeaturedProducts = ({
  spaLocations,
  products,
}: {
  spaLocations: SpaLocation[];
  products: Product[];
}) => {
  const t = useTranslations("home" as NamespaceKeys<string, string>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);

  const swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: products.length <= 5,
    autoplay: false,
    pagination: false,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
    },
  };

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Product | undefined>(
    undefined
  );

  const handleBookNow = (service: Product) => {
    setSelectedService(service);
    setShowBookingModal(true);

    (document.getElementById("footer_tool") as HTMLElement).style.zIndex = "-1";
    (document.getElementsByClassName("a1")[0] as HTMLElement).style.zIndex = "-1";
    (document.getElementsByClassName("s5")[0] as HTMLElement).style.zIndex = "-1";

    document.body.classList.add("box-hidden");
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedService(undefined);

    (document.getElementById("footer_tool") as HTMLElement).style.zIndex = '';
    (document.getElementsByClassName("a1")[0] as HTMLElement).style.zIndex = '';
    (document.getElementsByClassName("s5")[0] as HTMLElement).style.zIndex = '';

    document.body.classList.remove("box-hidden");
  };

  return (
    <div className="s sH s6">
      <div
        className="m8"
        style={{ display: showBookingModal ? "block" : "none" }}
      >
        <BookingForm
          spaLocations={spaLocations}
          selectedService={selectedService}
          id="form2"
        >
          <div className="s1_t c2">
            <span>
              Spa Booking:{" "}
              <strong id="modal-name">{selectedService?.name}</strong>
            </span>
            <i className="s1_z ic ic-close" onClick={closeModal}></i>
          </div>
        </BookingForm>
      </div>

      <div className="container">
        <div className="s_h">
          <h2 className="s_t">{t("featuredProducts.title")}</h2>
          <p className="s_p">{t("featuredProducts.subtitle")}</p>
        </div>
        <div className="s4_m">
          <div className="s4_mw">
            <Swiper
              {...swiperConfig}
              className="tw:overflow-visible tw:md:overflow-hidden"
            >
              {products.map((featuredProduct) => (
                <SwiperSlide key={featuredProduct.id}>
                  <div className="s4_i">
                    <div
                      className="s4_a"
                      style={{
                        backgroundImage: `url(${
                          featuredProduct.image_url || "/images/logo.jpeg"
                        })`,
                      }}
                    >
                      {/* <Image
                        className="tw:w-full"
                        src={featuredProduct.image_url || "/images/logo.jpeg"}
                        alt={featuredProduct.name}
                        width={300}
                        height={200}
                      /> */}
                      <div className="s4_ac fl fl-3">
                        <span className="s4_ad">
                          {t("featuredProducts.minutes", {
                            minutes: featuredProduct.duration,
                          })}
                        </span>
                        <span className="s4_an">
                          {tCommon("prices", {
                            priceVnd: formatPriceWithCurrency(
                              featuredProduct.prices.VND,
                              CURRENCY.VND
                            ),
                            priceUsd: formatPriceWithCurrency(
                              featuredProduct.prices.USD,
                              CURRENCY.USD
                            ),
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="s2_b">
                      <h3
                        className="s2_t tw:cursor-pointer"
                        onClick={() => handleBookNow(featuredProduct)}
                      >
                        {/* <Link href={`/featured-products`}> */}
                        {featuredProduct.name}
                        {/* </Link> */}
                      </h3>
                      <ul className="s2_c">
                        <li>
                          <strong>{t("featuredProducts.duration")}: </strong>
                          {t("featuredProducts.minutes", {
                            minutes: featuredProduct.duration,
                          })}
                        </li>
                        <li>
                          <strong>{t("featuredProducts.price")}: </strong>
                          {tCommon("prices", {
                            priceVnd: formatPriceWithCurrency(
                              featuredProduct.prices.VND,
                              CURRENCY.VND
                            ),
                            priceUsd: formatPriceWithCurrency(
                              featuredProduct.prices.USD,
                              CURRENCY.USD
                            ),
                          })}
                        </li>
                        <li>{featuredProduct.description}</li>
                      </ul>
                      {/* <Link
                        href={`/featured-products/${featuredProduct.id}`}
                        className="s2_y"
                      >
                        {t("featuredProducts.readMore")}
                      </Link> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="s6_f fl fl-2">
            <a href="/menu-prices" className="btn btn-2 s6_fa">
              {t("featuredProducts.viewSpaMenu")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
