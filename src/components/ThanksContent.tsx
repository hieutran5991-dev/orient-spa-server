"use client";

import { useTranslations, useLocale } from "next-intl";
import type { NamespaceKeys } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import BookingSteps from "@/components/booking/BookingSteps";

const ThanksContent = () => {
  const locale = useLocale();
  const t = useTranslations("thanks" as NamespaceKeys<string, string>);

  return (
    <main className="main-content">
      <div className="s k1">
        <BookingSteps currentStep={3} />
      </div>

      {/* Thank You Content */}
      <div className="tw:py-15 tw:bg-gray-50 tw:min-h-[70vh] tw:flex tw:items-center">
        <div className="container">
          <div className="tw:text-center tw:max-w-[800px] tw:mx-auto tw:bg-white tw:py-[20px] tw:px-10 tw:rounded-xl tw:shadow-xl md:tw:mx-4 tw:md:py-15 tw:md:px-5">
            <div className="tw:mb-12">
              <Image
                src="/images/thanks.png"
                alt={t("thankYouIconAlt")}
                width={150}
                height={150}
                className="tw:max-w-full tw:h-auto tw:mx-auto"
              />
            </div>

            <div>
              <h1 className="tw:text-4xl tw:text-gray-800 tw:mb-4 tw:font-semibold tw:leading-tight tw:md:text-3xl">
                {t("title")}
              </h1>
              <p className="tw:text-xl tw:text-gray-600 tw:mb-8 tw:md:text-lg">
                {t("subtitle")}
              </p>

              <div className="tw:bg-gray-50 tw:p-6 tw:rounded-lg tw:mb-10 tw:border-l-4 tw:border-[var(--main-color)] tw:md:p-5 tw:mx-auto tw:md:max-w-[80%] tw:md:text-2xl">
                <p className="tw:m-0 tw:text-gray-700 tw:leading-relaxed">
                  {t("emailConfirmation.text1")}{" "}
                  <strong>{t("emailConfirmation.correct")}</strong>
                  {t("emailConfirmation.text2")}{" "}
                  <Link
                    href={`/${locale}/contact`}
                    className="tw:text-[var(--main-color)] tw:no-underline tw:font-medium tw:hover:underline"
                  >
                    {t("emailConfirmation.contactUs")}
                  </Link>
                  {t("emailConfirmation.text3")}
                </p>
              </div>

              <div>
                <a
                  href={`/${locale}`}
                  className="tw:bg-[var(--main-color)] tw:hover:bg-[var(--hover-color)] tw:text-white tw:py-5 tw:px-12 tw:border-0 tw:rounded-md tw:text-xl tw:md:text-2xl tw:no-underline tw:inline-block tw:transition-colors tw:duration-300"
                >
                  {t("backToHomePage")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThanksContent;
