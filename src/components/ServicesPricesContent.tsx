"use client";

import { useTranslations, type NamespaceKeys } from "next-intl";
import Link from "next/link";
import { useState, useMemo, useRef } from "react";
import { CURRENCY } from "@/utils/constants";
import { formatPriceWithCurrency } from "@/utils/format";
import { SpaLocation } from "@/types/api";
import { Category, Product } from "@/types/common";
import BookingForm from "./BookingForm";

interface ServicesPricesContentProps {
  spaLocations: SpaLocation[];
  categories: Category[];
  products: Product[];
}

const ServicesPricesContent = ({
  spaLocations,
  categories,
  products,
}: ServicesPricesContentProps) => {
  const t = useTranslations("services" as NamespaceKeys<string, string>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const [activeTab, setActiveTab] = useState(
    categories.length ? categories[0].id : 1
  );
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Product | undefined>(
    undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const serviceCategories = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        services: products.filter(
          (product) => product.category_id === category.id
        ),
      })),
    [categories, products]
  );

  const handleTabClick = (tabId: number) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);

      const needScroll = (containerRef.current?.getBoundingClientRect().top ?? -1) < 0;
      const activeTabContent = document.querySelector('.container');

      if(activeTabContent && needScroll) {
        activeTabContent.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  };

  const handleBookNow = (service: Product) => {
    setSelectedService(service);
    setShowBookingModal(true);

    (document.getElementById("footer_tool") as HTMLElement).style.zIndex = "-1";
    document.body.classList.add('box-hidden');
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedService(undefined);

    (document.getElementById("footer_tool") as HTMLElement).style.zIndex = "9999";
    document.body.classList.remove('box-hidden');
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
      <div className="title-container text-center">
        <h1 className="title-text">{t("title")}</h1>
      </div>

      <div className="s category-bar tw:mb-[40px]" ref={containerRef}>
        <div className="container">
          <div className="s8_m">
            <div className="s8_b">
              <div className="s8_n tw:sticky tw:top-0 tw:left-0 tw:right-0 tw:z-51 tw:bg-white">
                <ul className={"tabs s8_nm"}>
                  {serviceCategories.map((category) => (
                    <li
                      key={category.id}
                      className={activeTab === category.id ? "active" : ""}
                      data-tab={category.id}
                      onClick={() => handleTabClick(category.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <span>{category.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="s8_c">
                {serviceCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`tab-content ${
                      activeTab === category.id ? "active" : ""
                    }`}
                    id={category.id.toString()}
                  >
                    {category.services.map((service: Product) => (
                      <div key={service.id} className="s8_i tw:pr-0">
                        <div className="s8_c tw:max-w-[65%]">
                          <h2 className="s8_l" id={`name${service.id}`}>
                            {service.name}
                          </h2>
                          {service.description && (
                            <div className="s8_p">
                              <p>
                                {service.description
                                  .split("\n")
                                  .map((line, index) => (
                                    <span key={index}>
                                      {line}
                                      {index <
                                        service.description.split("\n").length -
                                          1 && <br />}
                                    </span>
                                  ))}
                              </p>
                            </div>
                          )}
                          <div className="s8_d">
                            <span>
                              {service.duration} {t("minutes")}
                            </span>
                            <strong>
                              {tCommon(
                                "prices",
                                { 
                                  priceVnd: formatPriceWithCurrency(service.prices.VND, CURRENCY.VND),
                                  priceUsd: formatPriceWithCurrency(service.prices.USD, CURRENCY.USD)
                                }
                              )}
                            </strong>
                          </div>
                        </div>

                        <div
                          onClick={() => handleBookNow(service)}
                          className="tw:ml-auto"
                        >
                          <span className="btn tw:bg-[var(--main-color)] tw:text-white tw:hover:bg-[var(--hover-color)] tw:text-xl tw:md:text-2xl tw:md:w-[198px] tw:w-[110px] tw:h-[40px] tw:md:h-[50px]">
                            Book Now
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="s8_f">
              <div className="a8_c text-center">
                <p>
                  <strong>{t("note")}</strong> {t("noteText")}{" "}
                  <Link href="/contact">
                    {t("navigation.contact")}
                  </Link>
                  {t("noteEnd")}
                </p>
              </div>
            </div>
          </div>

          <div className="a8_c text-center">
            <p className="tw:mb-0">
              {t("subtitle")}{" "}
              <Link href="/featured-products">
                {t("navigation.featuredProducts")}
              </Link>
              . <span dangerouslySetInnerHTML={{ __html: t("hotlineText") }} />
            </p>
            <a
              href="/pdf/Menu_SenSpa_Danang_2026.pdf"
              download="Menu_SenSpa_Danang_2026.pdf"
              className="btn btn-1 btn-block a5_sa tw:mt-[32px]"
            >
              {t("downloadMenu")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPricesContent;
