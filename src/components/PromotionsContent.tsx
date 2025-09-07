"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/utils/constants";
import Link from "next/link";
import Image from "next/image";
import type { NamespaceKeys } from "use-intl";
import type { Product } from "@/types/booking";
import React from "react";

interface PromotionsPageProps {
  products: Product[];
}

const PromotionsContent = ({ products }: PromotionsPageProps) => {
  const t = useTranslations("promotions" as NamespaceKeys<string, string>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;

  return (
    <main className="tw:bg-white tw:min-h-screen">
      <div className="tw:bg-[var(--main-color)] tw:font-[MtdValkySemibold] tw:text-white tw:py-[30px]">
        <div className="tw:max-w-6xl tw:mx-auto tw:px-4 tw:text-center tw:text-4xl tw:md:text-[4.8rem] tw:uppercase">
          {t("specialTitle")}
        </div>
      </div>

      <div className="tw:py-16">
        <div className="tw:container tw:mx-auto tw:px-4">
          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-3 tw:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="tw:bg-white tw:rounded-lg tw:shadow-lg tw:overflow-hidden tw:transition-transform tw:duration-300 hover:tw:transform hover:tw:scale-105"
              >
                {/* Image */}
                <div className="tw:relative tw:h-64 tw:overflow-hidden tw:bg-gradient-to-br tw:from-pink-100 tw:to-purple-100 tw:flex tw:items-center tw:justify-center">
                  <div className="tw:text-6xl tw:text-pink-300">🌸</div>
                </div>

                {/* Content */}
                <div className="tw:p-6">
                  <h3 className="tw:text-xl tw:font-semibold tw:text-gray-800 tw:mb-2">
                    {product.name}
                  </h3>

                  <div className="tw:flex tw:justify-between tw:items-center tw:mb-4">
                    <span className="tw:text-sm tw:text-gray-500">
                      {product.duration} minutes
                    </span>
                    {/*<span className="tw:text-lg tw:font-bold tw:text-pink-600">*/}
                    {/*  ${product.price}*/}
                    {/*</span>*/}
                  </div>

                  {product.description && (
                    <p className="tw:text-gray-600 tw:text-sm tw:mb-6 tw:leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  <Link
                    href={`/${locale}/promotions/${product.id}`}
                    className="tw:inline-block tw:bg-pink-500 tw:text-white tw:px-6 tw:py-2 tw:rounded-md tw:font-medium tw:transition-colors tw:duration-300 hover:tw:bg-pink-600 tw:uppercase tw:text-sm tw:tracking-wide"
                  >
                    {t("readMore")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PromotionsContent;
