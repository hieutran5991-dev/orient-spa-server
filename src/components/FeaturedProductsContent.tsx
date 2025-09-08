"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/utils/constants";
import type { NamespaceKeys } from "use-intl";
import type { Product } from "@/types/common";
import React, { useState } from "react";
import BookingForm from "./BookingForm";
import { SpaLocation } from "@/types/api";

interface FeaturedProductsPageProps {
  spaLocations: SpaLocation[];
  products: Product[];
}

const FeaturedProductsContent = ({
  spaLocations,
  products,
}: FeaturedProductsPageProps) => {
  const t = useTranslations(
    "featuredProducts" as NamespaceKeys<string, string>
  );
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Product | undefined>(
    undefined
  );

  const handleBookNow = (service: Product) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedService(undefined);
  };

  return (
    <>
      <div
        className="m8"
        style={{ display: showBookingModal ? "block" : "none" }}
      >
        <BookingForm
          spaLocations={spaLocations}
          selectedService={selectedService}
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
      <main className="tw:bg-white tw:min-h-screen">
        <div className="tw:bg-[var(--main-color)] tw:font-[MtdValkySemibold] tw:text-white tw:py-[30px]">
          <div className="tw:mx-auto tw:px-4 tw:text-center tw:text-4xl tw:md:text-[4.8rem] tw:uppercase">
            {t("featuredProducts")}
          </div>
        </div>

        <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-3 tw:gap-x-8 tw:gap-y-20 tw:mx-auto tw:px-10 tw:py-16 tw:max-w-[1250px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="tw:flex tw:flex-col tw:bg-white tw:rounded-lg tw:shadow-md tw:overflow-hidden tw:transition-transform tw:duration-300 hover:tw:transform hover:tw:scale-105"
            >
              {/* Image */}
              <div
                // href={`/featured-products/${product.id}`} This is an a tag to product detail page
                onClick={() => handleBookNow(product)}
                className="tw:cursor-pointer"
              >
                <div className="tw:relative tw:h-[280px] tw:overflow-hidden tw:flex tw:items-center tw:justify-center">
                  <img
                    src={
                      product.image_url
                        ? product.image_url
                        : "/images/logo.jpeg"
                    }
                    alt={product.name}
                    className="tw:w-full tw:h-full tw:object-contain"
                  />
                </div>
              </div>
              {/* <div className="tw:relative tw:h-[270px] tw:overflow-hidden tw:bg-gradient-to-br tw:from-pink-100 tw:to-purple-100 tw:flex tw:items-center tw:justify-center">
                      <div className="tw:text-6xl tw:text-pink-300">🌸</div>
                  </div> */}

              {/* Content */}
              <div className="tw:p-6 tw:flex tw:flex-col tw:flex-grow">
                <div
                  // href={`/services-prices`}  This is an a tag to product detail page
                  className="tw:text-3xl tw:font-[600] tw:mb-2 hoverable-link tw:cursor-pointer"
                  onClick={() => handleBookNow(product)}
                >
                  {product.name}
                </div>

                <div className="tw:flex tw:justify-between tw:items-center tw:mb-6 tw:flex-grow">
                  <ul className="s2_c tw:mt-4">
                    <li className="tw:text-2xl tw:leading-relaxed">
                      <strong>{t("duration")}: </strong>
                      {t("minutes", { minutes: product.duration })}
                    </li>
                    <li className="tw:text-2xl tw:leading-relaxed">
                      <strong>{t("price")}: </strong>
                      {product.price.toLocaleString()} {product.currency}
                    </li>
                    <li className="tw:text-2xl tw:leading-relaxed">
                      <strong>{t("description")}: </strong>
                      {product.description}
                    </li>
                  </ul>
                </div>

                <div className="tw:mt-8 tw:mb-5 tw:flex tw:justify-center">
                  <button
                    onClick={() => handleBookNow(product)}
                    className="tw:block tw:w-1/2 tw:bg-[var(--main-color)] tw:hover:bg-[var(--hover-color)] tw:text-white tw:px-6 tw:py-4 tw:uppercase tw:text-2xl tw:tracking-wide tw:text-center"
                  >
                    {t("bookNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default FeaturedProductsContent;
