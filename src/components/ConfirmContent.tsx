"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { NamespaceKeys } from "use-intl";
import { saveBooking } from "@/api/common";
import { BookingData, BookingSubmissionData } from "@/types/booking";
import { Product } from "@/types/common";
import { BOOKING_CONFIRM_KEY, BOOKING_INIT_KEY, CURRENCY } from "@/utils/constants";
import BookingSteps from "@/components/booking/BookingSteps";
import { formatPriceWithCurrency } from "@/utils/format";

const ConfirmContent = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [_isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const t = useTranslations("confirm" as NamespaceKeys<any, any>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);

  useEffect(() => {
    const savedData = sessionStorage.getItem(BOOKING_CONFIRM_KEY);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setBookingData(parsedData);
      } catch (_) {
        router.push("/");
      }
    } else {
      router.push("/");
    }

    setIsLoading(false);
  }, [router]);

  const confirmContent = () => {
    window.location.href = "/booking";
  };

  const handleConfirmBooking = async () => {
    setIsConfirming(true);

    try {
      const submitData: BookingSubmissionData = {
        ...bookingData,
        booking_details: bookingData.booking_details?.reduce(
          (acc, services, index) => {
            const guestKey = `guest_${index + 1}_services`;
            acc[guestKey] = services.map((service) => service.id);
            return acc;
          },
          {} as Record<string, (string | number)[]>
        ),
      };
      const result = await saveBooking(submitData);

      if (result) {
        sessionStorage.removeItem(BOOKING_CONFIRM_KEY);
        sessionStorage.removeItem(BOOKING_INIT_KEY);
        window.location.href = "/thanks";
      }
    } catch (_error) {
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <main className="main-content">
      <div className="s k1">
        <BookingSteps currentStep={3} />
      </div>

      <div className="s k2">
        <div className="container">
          <div className="k2_w fl">
            <div className="k2_d sticky-lg">
              <div className="k2_i">
                <div className="k2_h hidden-sm hidden-xs">
                  {t("appointmentSummary.title")}
                </div>
                <div className="k2_b">
                  <div className="k2_da hidden-sm hidden-xs"></div>
                  <div className="k2_dc active">
                    <div className="k2_dt hidden-lg hidden-md">
                      {t("appointmentSummary.title")}
                    </div>
                    <div className="k2_dm">
                      <ul className="k2_dn">
                        <li>
                          <strong>{t("appointmentSummary.date")}</strong>{" "}
                          {bookingData.booking_date}
                        </li>
                        <li>
                          <strong>{t("appointmentSummary.time")}</strong>{" "}
                          {bookingData.booking_time}
                        </li>
                        <li>
                          <strong>{t("appointmentSummary.location")}</strong>{" "}
                          {bookingData?.agency_name}
                        </li>
                        <li>
                          <strong>{t("appointmentSummary.guests")}</strong>{" "}
                          {bookingData.people}
                        </li>
                      </ul>

                      <div className="k2_ds hidden-sm hidden-xs">
                        {bookingData.booking_details?.map(
                          (services: Product[], index: number) => (
                            <div key={index} className="k2_di">
                              <table>
                                <tbody>
                                  <tr>
                                    <th colSpan={2}>
                                      {t("appointmentSummary.guest")}{" "}
                                      {index + 1}:
                                    </th>
                                  </tr>
                                  {services.map(
                                    (
                                      service: Product,
                                      serviceIndex: number
                                    ) => (
                                      <tr key={serviceIndex}>
                                        <td>{service.name}</td>
                                        <td>{tCommon(
                                          "prices",
                                          {
                                            priceVnd: formatPriceWithCurrency(service.prices.VND, CURRENCY.VND),
                                            priceUsd: formatPriceWithCurrency(service.prices.USD, CURRENCY.USD)
                                          }
                                        )}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )
                        )}

                        {Object.values(bookingData.total_price || {}).some(price => price > 0) && (
                            <div className="k2_di">
                              <table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <strong>
                                        {t("serviceDetails.totalPrice")}
                                      </strong>
                                    </td>
                                    <td>
                                      <strong>
                                        {tCommon(
                                          "prices",
                                          { 
                                            priceVnd: formatPriceWithCurrency(bookingData.total_price?.VND || 0, CURRENCY.VND),
                                            priceUsd: formatPriceWithCurrency(bookingData.total_price?.USD || 0, CURRENCY.USD)
                                          }
                                        )}
                                      </strong>
                                    </td>
                                  </tr>
                                  <tr style={{ color: "green" }}>
                                    <td>
                                      <strong>
                                        {t("serviceDetails.discount10")}
                                      </strong>
                                    </td>
                                    <td>
                                      <strong>
                                        - {tCommon(
                                          "prices",
                                          { 
                                            priceVnd: formatPriceWithCurrency((bookingData.total_price?.VND || 0) * 0.1, CURRENCY.VND),
                                            priceUsd: formatPriceWithCurrency((bookingData.total_price?.USD || 0) * 0.1, CURRENCY.USD)
                                          }
                                        )}
                                      </strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>
                                        {t("serviceDetails.totalAfterDiscount")}
                                      </strong>
                                    </td>
                                    <td>
                                      <strong>
                                        {tCommon(
                                          "prices",
                                          { 
                                            priceVnd: formatPriceWithCurrency((bookingData.total_price?.VND || 0) - ((bookingData.total_price?.VND || 0) * 0.1), CURRENCY.VND),
                                            priceUsd: formatPriceWithCurrency((bookingData.total_price?.USD || 0) - ((bookingData.total_price?.USD || 0) * 0.1), CURRENCY.USD)
                                          }
                                        )}
                                      </strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="k2_m">
              <div className="k2_mw">
                <div className="k2_i ot">
                  <div className="k2_h">{t("serviceDetails.title")}</div>
                  <div className="k2_b">
                    <div className="k2_ds z16">
                      {bookingData.booking_details?.map(
                        (services: Product[], index: number) => (
                          <div key={index} className="k2_di">
                            <table>
                              <tbody>
                                <tr>
                                  <th colSpan={2}>
                                    {t("appointmentSummary.guest")} {index + 1}:
                                  </th>
                                </tr>
                                {services.map(
                                  (service: Product, serviceIndex: number) => (
                                    <tr key={serviceIndex}>
                                      <td>{service.name}</td>
                                      <td>{tCommon(
                                        "prices",
                                        { 
                                          priceVnd: formatPriceWithCurrency(service.prices.VND, CURRENCY.VND),
                                          priceUsd: formatPriceWithCurrency(service.prices.USD, CURRENCY.USD)
                                        }
                                      )}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        )
                      )}

                      {Object.values(bookingData.total_price || {}).some(price => price > 0) && (
                          <div className="k2_di">
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <strong>
                                      {t("serviceDetails.totalPrice")}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {tCommon(
                                        "prices",
                                        { 
                                          priceVnd: formatPriceWithCurrency(bookingData.total_price?.VND || 0, CURRENCY.VND),
                                          priceUsd: formatPriceWithCurrency(bookingData.total_price?.USD || 0, CURRENCY.USD)
                                        }
                                      )}
                                    </strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>
                                      {t("serviceDetails.discount10")}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {tCommon(
                                        "prices",
                                        { 
                                          priceVnd: formatPriceWithCurrency((bookingData.total_price?.VND || 0) * 0.1, CURRENCY.VND),
                                          priceUsd: formatPriceWithCurrency((bookingData.total_price?.USD || 0) * 0.1, CURRENCY.USD)
                                        }
                                      )}
                                    </strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>
                                      {t("serviceDetails.totalAfterDiscount")}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>
                                      {tCommon(
                                        "prices",
                                        { 
                                          priceVnd: formatPriceWithCurrency((bookingData.total_price?.VND || 0) - ((bookingData.total_price?.VND || 0) * 0.1), CURRENCY.VND),
                                          priceUsd: formatPriceWithCurrency((bookingData.total_price?.USD || 0) - ((bookingData.total_price?.USD || 0) * 0.1), CURRENCY.USD)
                                        }
                                      )}
                                    </strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="k2_i ot">
                  <div className="k2_h">{t("contactInfo.title")}</div>
                  <div className="k2_b">
                    <div className="k2_ds z16">
                      <div className="k2_di">
                        <table>
                          <tbody>
                            <tr>
                              <td>{t("contactInfo.fullName")}</td>
                              <td>
                                <strong>{bookingData.full_name}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>{t("contactInfo.phone")}</td>
                              <td>
                                <strong>{bookingData.phone}</strong>
                              </td>
                            </tr>
                            {bookingData.social_account_id && (
                              <tr>
                                <td>{t("contactInfo.socialAccountId")}</td>
                                <td>
                                  <strong>
                                    {bookingData.social_account_id}
                                  </strong>
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td>{t("contactInfo.email")}</td>
                              <td>
                                <strong>{bookingData.email}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="k2_i ot">
                  <div className="k2_h">{t("cancellationPolicy.title")}</div>
                  <div className="k2_b">
                    <p>
                      <strong>{t("cancellationPolicy.advance")}</strong>
                    </p>
                    <p>{t("cancellationPolicy.confirmation")}</p>
                    <p>{t("cancellationPolicy.urgent")}</p>
                    <p>{t("cancellationPolicy.arrive")}</p>
                  </div>
                </div>
              </div>

              <div className="k2_f fl fl-2">
                <button
                  onClick={() => confirmContent()}
                  className="btn btn-2 tw:md:mb-0 mb-8"
                  disabled={isConfirming}
                >
                  <i className="fa fa-angle-left"></i>
                  {t("actions.changeService")}
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="btn btn-1 tw:relative"
                  disabled={isConfirming}
                >
                  {isConfirming ? (
                    <div className="tw:flex tw:items-center tw:justify-center tw:space-x-2">
                      <div className="tw:w-4 tw:h-4 tw:border-2 tw:border-white tw:border-t-transparent tw:rounded-full tw:animate-spin"></div>
                      <span>{t("actions.processing")}</span>
                    </div>
                  ) : (
                    t("actions.confirm")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfirmContent;
