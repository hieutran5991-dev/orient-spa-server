"use client";

import { useTranslations, useLocale, type NamespaceKeys } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BOOKING_INIT_KEY, type Locale } from "@/utils/constants";
import { formatPrice } from "@/utils/format";
import { SpaLocation } from "@/types/api";
import { getListCategories, getListProducts } from "@/api/common";
import { Category, Product } from "@/types/common";

interface ServicesPricesContentProps {
  spaLocations: SpaLocation[];
}

const ServicesPricesContent = ({
  spaLocations,
}: ServicesPricesContentProps) => {
  const locale = useLocale() as Locale;
  const t = useTranslations("services" as NamespaceKeys<string, string>);
  const [activeTab, setActiveTab] = useState(-1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Product | null>(null);

  const [serviceCategories, setServiceCategories] = useState<Category[]>([]);

  const allCategories: Category[] = [];
  useEffect(() => {
    getListCategories()
      .then((res) => {
        (res.data ?? []).map((category) => {
          allCategories.push({
            ...category,
            services: [],
          });
        });
      })
      .finally(() => {
        getListProducts()
          .then((resP) => {
            (resP.data ?? []).forEach((product) => {
              const categoryP = allCategories.findIndex(
                (category) => category.id === product.category_id
              );

              if (categoryP !== -1) {
                allCategories[categoryP].services.push(product);
              }
            });
          })
          .finally(() => {
            setServiceCategories(allCategories);
            setActiveTab(allCategories.length ? allCategories[0].id : 1);
          });
      });
  }, []);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const handleBookNow = (service: Product) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
  };

  return (
    <>
      {showBookingModal && (
        <BookingModal
          service={selectedService}
          onClose={handleCloseModal}
          spaLocations={spaLocations}
        />
      )}
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
                      <div key={service.id} className="s8_i">
                        <div className="s8_c">
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
                            <strong>{formatPrice(service.price)}</strong>
                          </div>
                        </div>
                        <div onClick={() => handleBookNow(service)}>
                          <span className="btn btn-2 s8_v js-bk">Book Now</span>
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

interface BookingModalProps {
  service: Product | null;
  onClose: () => void;
  spaLocations: SpaLocation[];
}

const BookingModal = ({
  service,
  onClose,
  spaLocations,
}: BookingModalProps) => {
  const locale = useLocale() as Locale;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedSpa, setSelectedSpa] = useState("");
  const [selectedSpaId, setSelectedSpaId] = useState<string | number>("");
  const [showSpaDropdown, setShowSpaDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPeople, setSelectedPeople] = useState("");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);

  const tBooking = useTranslations("booking" as NamespaceKeys<any, any>);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const bookingData = {
      agency_name: selectedSpa,
      agency_id: selectedSpaId,
      booking_date: selectedDate,
      booking_time: selectedTime,
      people: selectedPeople,
      booking_details: Array(parseInt(selectedPeople) || 1).fill([
        {
          id: service?.id,
          name: service?.name,
          description: service?.description,
          duration: service?.duration,
          price: service?.price,
        },
      ]),
    };

    try {
      sessionStorage.setItem(BOOKING_INIT_KEY, JSON.stringify(bookingData));
      window.location.href = `/${locale}/booking`;
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSpaSelect = (spaName: string, spaId: string | number) => {
    setSelectedSpa(spaName);
    setSelectedSpaId(spaId);
    setShowSpaDropdown(false);
  };

  const clearModalData = () => {
    setSelectedSpa("");
    setSelectedSpaId("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedPeople("");
    setShowSpaDropdown(false);
    setShowTimeDropdown(false);
    setShowPeopleDropdown(false);
    setError("");
    setIsSubmitting(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".s1_s2") && !target.closest("#f2")) {
        setShowSpaDropdown(false);
      }
      if (!target.closest(".s1_s3") && !target.closest("#f3")) {
        setShowTimeDropdown(false);
      }
      if (!target.closest(".s1_s4") && !target.closest("#f1")) {
        setShowPeopleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="m8">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="s1_f"
        id="formBookBox"
      >
        <div className="s1_t c2">
          <span>
            Spa Booking:{" "}
            <strong id="modal-name">{service?.name || "Service"}</strong>
          </span>
          <i
            className="s1_z ic ic-close"
            onClick={() => {
              clearModalData();
              onClose();
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="row">
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                className="form-control u1 js-v2"
                id="f2"
                inputMode="none"
                name="spa"
                value={selectedSpa}
                onChange={(e) => setSelectedSpa(e.target.value)}
                onFocus={() => setShowSpaDropdown(true)}
                required
                type="text"
              />
              <label htmlFor="f2" className="s1_v">
                {tBooking("location")}
              </label>
              <span className="fc-feedback">
                <i className="fa fa-angle-down" />
              </span>

              <div
                className="s1_s w2 s1_s2"
                style={{
                  display: showSpaDropdown ? "block" : "none",
                }}
              >
                <div className="s1_sh hidden-lg hidden-md">
                  <div className="s1_st">{tBooking("selectLocation")}</div>
                  <span
                    className="s1_x js-done"
                    onClick={() => setShowSpaDropdown(false)}
                  >
                    <i className="ic ic-close"></i>
                  </span>
                </div>
                <div className="s1_sd">
                  <ul className="s1_d">
                    {spaLocations &&
                      spaLocations.map((location) => (
                        <li
                          key={location.id}
                          onClick={() =>
                            handleSpaSelect(location.name, location.id)
                          }
                        >
                          <strong>{location.name}</strong>
                          <span>{location.address}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="s1_sf hidden-lg hidden-md">
                  <span
                    className="s1_su js-done btn btn-1 btn-block"
                    onClick={() => setShowSpaDropdown(false)}
                  >
                    {tBooking("done")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                type="text"
                id="date"
                name="date"
                className="form-control u1 js-v1"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
              <label htmlFor="date" className="s1_v">
                Date
              </label>
              <span className="fc-feedback">
                <i className="fa fa-calendar"></i>
              </span>
            </div>
          </div> */}
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                type="text"
                id="date"
                name="date"
                className="form-control u1 js-v1"
                required
              />
              <label htmlFor="date" className="s1_v">
                {tBooking("date")}
              </label>
              <span className="fc-feedback">
                <i className="fa fa-calendar"></i>
              </span>
            </div>
          </div>
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                className="form-control u1 js-v3"
                id="f3"
                inputMode="none"
                name="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                onFocus={() => setShowTimeDropdown(true)}
                required
                type="text"
              />
              <label className="s1_v" htmlFor="f3">
                Time
              </label>
              <span className="fc-feedback">
                <i className="fa fa-angle-down" />
              </span>
              <div
                className="s1_s w2 s1_s3"
                style={{
                  display: showTimeDropdown ? "block" : "none",
                }}
              >
                <div className="s1_sh hidden-lg hidden-md">
                  <div className="s1_st">Select time</div>
                  <span className="s1_x js-done">
                    <i className="ic ic-close" />
                  </span>
                </div>
                <div className="s1_sd">
                  <div className="s1_k" id="listTimes">
                    <div className="s1_l">
                      Availability for Sun, 24 Aug 2025
                    </div>
                    <dl className="s1_j">
                      <dt>Morning:</dt>
                      <dd onClick={() => setSelectedTime("10:00")}>10:00</dd>
                      <dd onClick={() => setSelectedTime("10:30")}>10:30</dd>
                      <dd onClick={() => setSelectedTime("11:00")}>11:00</dd>
                      <dd onClick={() => setSelectedTime("11:30")}>11:30</dd>
                    </dl>
                    <dl className="s1_j">
                      <dt>Afternoon:</dt>
                      <dd onClick={() => setSelectedTime("12:00")}>12:00</dd>
                      <dd onClick={() => setSelectedTime("12:30")}>12:30</dd>
                      <dd onClick={() => setSelectedTime("13:00")}>13:00</dd>
                      <dd onClick={() => setSelectedTime("13:30")}>13:30</dd>
                      <dd onClick={() => setSelectedTime("14:00")}>14:00</dd>
                      <dd onClick={() => setSelectedTime("14:30")}>14:30</dd>
                      <dd onClick={() => setSelectedTime("15:00")}>15:00</dd>
                      <dd onClick={() => setSelectedTime("15:30")}>15:30</dd>
                      <dd onClick={() => setSelectedTime("16:00")}>16:00</dd>
                      <dd onClick={() => setSelectedTime("16:30")}>16:30</dd>
                      <dd onClick={() => setSelectedTime("17:00")}>17:00</dd>
                      <dd onClick={() => setSelectedTime("17:30")}>17:30</dd>
                      <dd onClick={() => setSelectedTime("18:00")}>18:00</dd>
                      <dd onClick={() => setSelectedTime("18:30")}>18:30</dd>
                    </dl>
                    <dl className="s1_j">
                      <dt>Evening:</dt>
                      <dd onClick={() => setSelectedTime("19:00")}>19:00</dd>
                      <dd onClick={() => setSelectedTime("19:30")}>19:30</dd>
                      <dd onClick={() => setSelectedTime("20:00")}>20:00</dd>
                      <dd onClick={() => setSelectedTime("20:30")}>20:30</dd>
                    </dl>
                  </div>
                </div>
                <div className="s1_sf hidden-lg hidden-md">
                  <span
                    className="s1_su js-done btn btn-1 btn-block"
                    onClick={() => setShowTimeDropdown(false)}
                  >
                    Done
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                className="form-control u1 js-v4"
                id="f1"
                inputMode="none"
                name="people"
                value={selectedPeople}
                onChange={(e) => setSelectedPeople(e.target.value)}
                onFocus={() => setShowPeopleDropdown(true)}
                required
                type="text"
              />
              <label className="s1_v" htmlFor="f1">
                Guest
              </label>
              <span className="fc-feedback">
                <i className="fa fa-angle-down" />
              </span>
              <div
                className="s1_s s1_s4"
                style={{
                  display: showPeopleDropdown ? "block" : "none",
                }}
              >
                <div className="s1_sh hidden-lg hidden-md">
                  <div className="s1_st">Select guest</div>
                  <span className="s1_x js-done">
                    <i className="ic ic-close" />
                  </span>
                </div>
                <div className="s1_sd">
                  <ul className="s1_n">
                    <li onClick={() => setSelectedPeople("1")}>1</li>
                    <li onClick={() => setSelectedPeople("2")}>2</li>
                    <li onClick={() => setSelectedPeople("3")}>3</li>
                    <li onClick={() => setSelectedPeople("4")}>4</li>
                    <li onClick={() => setSelectedPeople("5")}>5</li>
                    <li onClick={() => setSelectedPeople("6")}>6</li>
                    <li onClick={() => setSelectedPeople("7")}>7</li>
                    <li onClick={() => setSelectedPeople("8")}>8</li>
                    <li onClick={() => setSelectedPeople("9")}>9</li>
                    <li onClick={() => setSelectedPeople("10")}>10</li>
                  </ul>
                </div>
                <div className="s1_sf hidden-lg hidden-md">
                  <span
                    className="s1_su js-done btn btn-1 btn-block"
                    onClick={() => setShowPeopleDropdown(false)}
                  >
                    Done
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <button
          className="btn btn-block btn-1 s1_u booknow"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "BOOK NOW!"}
        </button>
      </form>
    </div>
  );
};

export default ServicesPricesContent;
