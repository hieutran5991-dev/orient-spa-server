"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/utils/constants";
import Link from "next/link";
import Image from "next/image";
import type { NamespaceKeys } from "use-intl";
import type { Product } from "@/types/booking";

interface PromotionsPageProps {
  products: Product[];
}

const PromotionsContent = ({ products }: PromotionsPageProps) => {
  const t = useTranslations("promotions" as NamespaceKeys<string, string>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;

  return (
    <main className="tw:bg-white tw:min-h-screen">
      {/* Header Section */}
      <div className="tw:bg-gradient-to-r tw:from-pink-50 tw:to-purple-50 tw:py-10 tw:text-center">
        <div className="tw:container tw:mx-auto tw:px-4">
          <p className="tw:text-4xl tw:font-bold tw:text-gray-800 tw:mb-4">
            {t("specialTitle")}
          </p>
          <p className="tw:text-2xl tw:text-gray-600 tw:mx-auto">
            {t("specialSubtitle")}
          </p>
        </div>
      </div>

      <div className="tw:py-4">
        <div className="tw:container tw:mx-auto tw:px-4">
          <nav className="tw:flex tw:items-center tw:space-x-2 tw:text-xl tw:justify-center">
            <a
              href={`/${locale}`}
              className="tw:text-gray-600 hover:tw:text-gray-800 tw:transition-colors"
            >
              {tCommon("navigation.home")}
            </a>
            <span className="tw:text-gray-400"> {'>'} </span>
            <span className="tw:text-gray-800 tw:font-medium">
              {t("title")}
            </span>
          </nav>
        </div>
      </div>

      {/* Promotions Grid */}
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
