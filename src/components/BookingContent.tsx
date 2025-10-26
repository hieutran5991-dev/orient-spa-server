"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { NamespaceKeys } from "use-intl";
import type { BookingData, BookingSubmissionData } from "@/types/booking";
import { Product } from "@/types/common";
import { BOOKING_CONFIRM_KEY, BOOKING_INIT_KEY, CURRENCY } from "@/utils/constants";
import BookingSteps from "@/components/booking/BookingSteps";
import { formatPriceWithCurrency } from "@/utils/format";
import { saveBooking } from "@/api/common";

interface BookingContentProps {
  products: Product[];
}

const BookingContent = ({ products }: BookingContentProps) => {
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [guestForms, setGuestForms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations("booking" as NamespaceKeys<string, string>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);

  useEffect(() => {
    const savedData =
      sessionStorage.getItem(BOOKING_CONFIRM_KEY) ||
      sessionStorage.getItem(BOOKING_INIT_KEY);
    if (!savedData) {
      window.location.href = "/";
      return;
    }

    try {
      const parsedData = JSON.parse(savedData);
      setBookingData(parsedData);

      const numPeople = parseInt(parsedData.people || "1");
      const initialGuestForms = Array.from(
        { length: numPeople },
        (_, index) => `guest_${index + 1}_services`
      );
      setGuestForms(initialGuestForms);
      return;
    } catch (_) {
      sessionStorage.removeItem(BOOKING_INIT_KEY);
      window.location.href = "/";
    }
  }, []);

  const buildBookingDetails = (
    formData: FormData
  ):
    | {
        guestServiceInfo: Array<Product[]>;
        totalPrice: {
          VND: number;
          USD: number
        };
      }
    | Record<string, never> => {
    if (!guestForms?.length) return {};
    let totalPrice = {
      VND: 0,
      USD: 0
    };

    const guestServiceInfo = guestForms.reduce((details, guestKey) => {
      const services = formData.getAll(guestKey) as string[];
      let listProductPerGuest: Product[] = [];
      if (services.length > 0) {
        listProductPerGuest = services.reduce(
          (acc: Product[], productId: string) => {
            const product = products.find((p) => p.id === Number(productId));
            if (product) {
              acc.push(product);
              totalPrice.VND += product.prices.VND;
              totalPrice.USD += parseFloat(product.prices.USD.toFixed(2));
            }
            return acc;
          },
          [] as Product[]
        );
      }
      details.push(listProductPerGuest);
      return details;
    }, [] as Array<Product[]>);

    return { guestServiceInfo, totalPrice };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      let valid = true;
      for (let i = 0; i < guestForms.length; i++) {
        const guestServices = formData.getAll(`guest_${i + 1}_services`);
        if (guestServices.length === 0) {
          valid = false;
          const query = `input[name='guest_${i + 1}_services_input']`;
          (document.querySelector(query) as HTMLElement)?.focus();
          break;
        }
      }

      if (!valid) {
        setIsSubmitting(false);
        return;
      }

      const bookingDetails = buildBookingDetails(formData as FormData);

      const submitData: BookingSubmissionData = {
        ...bookingData,
        full_name: formData.get("full_name") as string,
        tel_prefix: (formData.get("dials") as string)?.replace(/[()]/g, ""),
        phone: (formData.get("phone") as string) || "",
        social_account_id: formData.get("social_account_id") as string,
        email: formData.get("email") as string,
        note: formData.get("content") as string,
        booking_details: bookingDetails?.guestServiceInfo?.reduce(
          (acc, services, index) => {
            const guestKey = `guest_${index + 1}_services`;
            acc[guestKey] = services.map((service) => service.id);
            return acc;
          },
          {} as Record<string, (string | number)[]>
        ),
        total_price: bookingDetails?.totalPrice,
      };
      const result = await saveBooking(submitData);

      if (result) {
        // sessionStorage.removeItem(BOOKING_CONFIRM_KEY);
        // sessionStorage.removeItem(BOOKING_INIT_KEY);
        window.location.href = "/thanks";
      }
    } catch (_error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main-content">
      <div className="s k1">
        <BookingSteps currentStep={2} />
      </div>

      <div className="s k2">
        <div className="container">
          <div className="k2_w fl">
            <div className="k2_d sticky-lg">
              <div className="k2_i">
                <div className="k2_h hidden-sm hidden-xs">
                  {t("appointmentSummary")}
                </div>
                <div className="k2_b">
                  <div className="k2_dc active">
                    <div className="k2_dt hidden-lg hidden-md">
                      {t("appointmentSummary")}
                    </div>
                    <div className="k2_dm">
                      <ul className="k2_dn">
                        <li>
                          <strong>{t("date")}</strong>{" "}
                          {bookingData.booking_date}
                        </li>
                        <li>
                          <strong>{t("time")}</strong>{" "}
                          {bookingData.booking_time}
                        </li>
                        <li>
                          <strong>{t("location")}</strong>{" "}
                          {bookingData.agency_name}
                        </li>
                        <li>
                          <strong>{t("numberOfGuests")}</strong>{" "}
                          {bookingData.people}
                        </li>
                      </ul>
                      <div className="k2_ds"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form
              className="k2_m"
              id="fromBook"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="k2_mw">
                {guestForms.map((_, guestIndex) => {
                  const hasSelected =
                    (bookingData?.booking_details?.[guestIndex]?.length || 0) >
                    0;
                  return (
                    <div key={guestIndex} className="k2_i">
                      <div className="k2_h">
                        {t("selectTreatmentForGuest")} {guestIndex + 1}
                      </div>
                      <div className="k2_b">
                        <div
                          className={`form-group ${
                            hasSelected ? "done" : "has-feedback"
                          }`}
                        >
                          <span className="form-label k2_l">
                            <i className="ic ic-user"></i>
                            {t("guest")} {guestIndex + 1}
                          </span>
                          <span className="k2_mt">{t("treatment")}</span>
                          <input
                            type="text"
                            className="form-control js-guest tw:focus:border-[var(--main-color)]"
                            name={`guest_${guestIndex + 1}_services_input`}
                            placeholder={t("selectYourTreatment")}
                            value={bookingData?.booking_details?.[guestIndex]
                              ?.map((e) => e.name)
                              .join(", ")}
                            readOnly
                          />
                          <span className="fc-feedback">
                            <i className="fa fa-angle-down"></i>
                          </span>

                          {/* Treatment Options */}
                          <div className="k2_s">
                            <div className="k2_sh hidden-lg hidden-md">
                              <strong>{t("selectTreatment")}</strong>
                              <span className="k2_sx js-done">
                                <i className="ic ic-close"></i>
                              </span>
                            </div>
                            <div className="k2_sb">
                              {products.map((service) => (
                                <div key={service.id} className="s8_i">
                                  <div className="s8_c">
                                    <h3 className="s8_l">{service.name}</h3>
                                    <div className="s8_p">
                                      <p style={{ whiteSpace: "pre-line" }}>
                                        {service.description}
                                      </p>
                                    </div>
                                    <div className="s8_d">
                                      <span>{t("minutes", { minutes: service.duration })}</span>
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
                                  <div className="s8_v">
                                    <input
                                      type="checkbox"
                                      name={`guest_${guestIndex + 1}_services`}
                                      value={service.id}
                                      id={`c_${guestIndex + 1}_${service.id}`}
                                      checked={bookingData?.booking_details?.[
                                        guestIndex
                                      ]?.some((e) => e.id === service.id)}
                                    />
                                    <label
                                      htmlFor={`c_${guestIndex + 1}_${
                                        service.id
                                      }`}
                                    ></label>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="k2_sf hidden-lg hidden-md">
                              <span className="btn btn-block btn-1 js-done">
                                {t("done")}
                              </span>
                            </div>
                          </div>

                          {guestIndex === 0 && (
                            <div className="k2_mk">
                              <input type="checkbox" name="select" id="all" />
                              <label htmlFor="all">
                                {t("applySameTreatmentForAll")}
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="k2_i ot">
                  <div className="k2_h">{t("contactInfo")}</div>
                  <div className="k2_b">
                    <div className="form-group">
                      <input
                        type="text"
                        name="full_name"
                        className="form-control"
                        required
                        id="id_full_name"
                        defaultValue={bookingData.full_name || ""}
                      />
                      <span
                        className="k2_v tw:cursor-pointer"
                        onClick={() =>
                          document.getElementById("id_full_name")?.focus()
                        }
                      >
                        {t("fullName")} <span style={{ color: "#f33" }}>*</span>
                      </span>
                    </div>

                    <div className="s_g x2">
                      <div className="s_gc">
                        <div className="k2_p form-group">
                          <div className="k2_pd has-feedback">
                            <input
                              type="text"
                              defaultValue={bookingData.tel_prefix || '(+84)'}
                              className="form-control js-phone"
                              name="dials"
                              readOnly
                            />
                            <span className="fc-feedback">
                              <i className="fa fa-angle-down"></i>
                            </span>
                          </div>

                          <div className="k2_ps">
                            <div className="k2_sh hidden-lg hidden-md">
                              <strong>{t("countryCode")}</strong>
                              <span className="k2_sx k2_px">
                                <i className="ic ic-close"></i>
                              </span>
                            </div>
                            <div className="k2_ph">
                              <strong>{t("selected")}</strong>
                              <div className="k2_pc">
                                {t("vietnam")}
                                <span>(+84)</span>
                              </div>
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder={t("countryOrRegion")}
                                className="form-control"
                                id="country_search"
                              />
                            </div>
                            <div className="k2_pb" id="book_phone"></div>
                          </div>

                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder={t("phoneNumber")}
                            id="id_phone"
                            defaultValue={bookingData.phone || ""}
                          />
                        </div>
                      </div>
                      <div className="s_gc">
                        <div className="form-group">
                          <input
                            type="text"
                            name="social_account_id"
                            className="form-control booking-not-required"
                            placeholder={'Not visible'}
                            id="id_social_account_id"
                            defaultValue={bookingData.social_account_id || ""}
                          />
                          <span
                            className="k2_v tw:cursor-pointer"
                            onClick={() =>
                              document
                                .getElementById("id_social_account_id")
                                ?.focus()
                            }
                          >
                            {t("socialAccountId")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        maxLength={320}
                        required
                        id="id_email"
                        defaultValue={bookingData.email || ""}
                      />
                      <span className="k2_v tw:cursor-pointer" onClick={() =>
                          document.getElementById("id_email")?.focus()
                        }
                      >
                        {t("email")} <span style={{ color: "#f33" }}>*</span>
                      </span>
                    </div>

                    <div className="form-group">
                      <span className="form-label k2_l">
                        {t("additionalRequest")}
                      </span>
                      <textarea
                        name="content"
                        cols={40}
                        rows={5}
                        className="form-control"
                        placeholder={t("additionalRequestPlaceholder")}
                        id="id_content"
                        defaultValue={bookingData.note || ""}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="k2_i ot">
                  <div className="k2_h">{t("cancellationPolicy")}</div>
                  <div className="k2_b">
                    <p>
                      <strong>{t("cancellationPolicyTitle")}</strong>
                    </p>
                    <p>{t("cancellationPolicyDesc1")}</p>
                    <p>{t("cancellationPolicyDesc2")}</p>
                    <p>{t("cancellationPolicyDesc3")}</p>
                  </div>
                </div>

                <input type="hidden" defaultValue="0" id="total" name="total" />
              </div>

              <div className="k2_f fl fl-2">
                <button
                  type="submit"
                  className="btn btn-1 btn-block k2_u"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("processing") : t("confirm")}{" "}
                  <i className="fa fa-angle-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingContent;
