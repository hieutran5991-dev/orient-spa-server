"use client";

import { useTranslations, useLocale, type NamespaceKeys } from "next-intl";
import Link from "next/link";
import { useState, useMemo } from "react";
import { type Locale } from "@/utils/constants";
import { formatPrice } from "@/utils/format";
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
  const locale = useLocale() as Locale;
  const t = useTranslations("services" as NamespaceKeys<string, string>);
  const [activeTab, setActiveTab] = useState(categories.length ? categories[0].id : 1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Product | undefined>(undefined);

  const serviceCategories = useMemo(() => categories.map((category) => ({
    ...category,
    services: products.filter((product) => product.category_id === category.id),
  })), [categories, products]);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const handleBookNow = (service: Product) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  return (
    <>
      <div className="m8" style={{ display: showBookingModal ? "block" : "none" }}>
        <BookingForm spaLocations={spaLocations} selectedService={selectedService}>
          <div className="s1_t c2">
            <span>Spa Booking: <strong id="modal-name">{selectedService?.name}</strong></span>
            <i className="s1_z ic ic-close"></i>
          </div>
        </BookingForm>
      </div>
      <div className="s a2 text-center">
        <h1 className="a2_t">{t("title")}</h1>
      </div>

      <div className="s sH s8">
        <div className="container">
          <div className="a8_c text-center">
            <p>
              {t("subtitle")}{" "}
              <Link href={`/${locale}/promotions`}>
                {t("navigation.promotions")}
              </Link>
              . <span dangerouslySetInnerHTML={{ __html: t("hotlineText") }} />
            </p>
            <a
              href="/static/images/Orient-Spa-Menu-2024_2025.pdf"
              download
              className="btn btn-1 btn-block a5_sa"
            >
              {t("downloadMenu")}
            </a>
          </div>

          <div className="s8_m">
            <div className="s_h">
              <h1 className="s_t2">{t("treatmentMenu")}</h1>
            </div>

            <div className="s8_b">
              <div className="s8_n">
                <ul className="tabs s8_nm">
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
                    className={`tab-content ${activeTab === category.id ? "active" : ""}`}
                    id={category.id.toString()}
                  >
                    {category.services.map((service: Product) => (
                      <div key={service.id} className='s8_i tw:pr-0'>
                        <div className='s8_c tw:max-w-[65%]'>
                          <h2 className='s8_l' id={`name${service.id}`}>
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
                            <strong>{formatPrice(service.price)}</strong>
                          </div>
                        </div>

                        <div onClick={() => handleBookNow(service)} className="tw:ml-auto">
                          <span className="btn btn-2 tw:md:w-[198px] tw:w-[110px] tw:h-[40px] tw:md:h-[50px]">Book Now</span>
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
                  <Link href={`/${locale}/contact`}>
                    {t("navigation.contact")}
                  </Link>
                  {t("noteEnd")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPricesContent;
