"use client";

import React from "react";
import { useTranslations } from "next-intl";
import type { NamespaceKeys } from "use-intl";

const AboutUsContent = () => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);

  return (
    <div className="tw:min-h-screen tw:bg-gray-50">
      <div className="tw:bg-[var(--main-color)] tw:font-[MtdValkySemibold] tw:text-white tw:py-[30px]">
        <div className="tw:max-w-6xl tw:mx-auto tw:px-4 tw:text-center tw:text-4xl tw:md:text-[4.8rem] tw:uppercase">
          {tCommon("aboutUs.title")}
        </div>
      </div>

      <div className="tw:max-w-6xl tw:mx-auto tw:px-4 tw:py-16">
        <div className="tw:space-y-6">
          <h2 className="tw:text-[2em] tw:font-bold tw:py-[12px] tw:text-[var(--main-color)]">
            {tCommon("aboutUs.welcomeTitle")}
          </h2>
          <p className="tw:text-[16px] tw:leading-12 tw:text-gray-800">
            {tCommon("aboutUs.content")}
          </p>

          <div className="tw:space-y-4 tw:mt-8">
            <div className="tw:flex tw:items-center tw:gap-3">
              <div className="tw:w-6 tw:h-6 tw:bg-[#9e2265] tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mt-1 tw:flex-shrink-0">
                <svg
                  className="tw:w-4 tw:h-4 tw:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="tw:text-gray-600">{tCommon("aboutUs.feature1")}</div>
            </div>

            <div className="tw:flex tw:items-center tw:gap-3">
              <div className="tw:w-6 tw:h-6 tw:bg-[#9e2265] tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mt-1 tw:flex-shrink-0">
                <svg
                  className="tw:w-4 tw:h-4 tw:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="tw:text-gray-600">{tCommon("aboutUs.feature2")}</div>
            </div>

            <div className="tw:flex tw:items-center tw:gap-3">
              <div className="tw:w-6 tw:h-6 tw:bg-[#9e2265] tw:rounded-full tw:flex tw:items-center tw:justify-center tw:mt-1 tw:flex-shrink-0">
                <svg
                  className="tw:w-4 tw:h-4 tw:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="tw:text-gray-600">{tCommon("aboutUs.feature3")}</div>
            </div>
          </div>

          <div className="tw:mt-8 tw:text-center">
            <a
              href="/reservation"
              className="btn tw:bg-[var(--main-color)] tw:text-white tw:hover:bg-[var(--hover-color)] tw:text-xl tw:md:text-2xl tw:md:w-[198px] tw:w-[110px] tw:h-[40px] tw:md:h-[50px]"
            >
              {tCommon("common.bookNow")}
            </a>
          </div>
        </div>

        <div className="tw:mt-20 tw:grid tw:grid-cols-2 tw:md:grid-cols-4 tw:gap-8 tw:text-center">
          <div className="tw:space-y-2">
            <div className="tw:text-3xl tw:font-bold tw:text-[#9e2265]">5+</div>
            <div className="tw:text-gray-600">
              {tCommon("aboutUs.stats.experience")}
            </div>
          </div>
          <div className="tw:space-y-2">
            <div className="tw:text-3xl tw:font-bold tw:text-[#9e2265]">
              1000+
            </div>
            <div className="tw:text-gray-600">
              {tCommon("aboutUs.stats.happyClients")}
            </div>
          </div>
          <div className="tw:space-y-2">
            <div className="tw:text-3xl tw:font-bold tw:text-[#9e2265]">
              20+
            </div>
            <div className="tw:text-gray-600">
              {tCommon("aboutUs.stats.services")}
            </div>
          </div>
          <div className="tw:space-y-2">
            <div className="tw:text-3xl tw:font-bold tw:text-[#9e2265]">
              100%
            </div>
            <div className="tw:text-gray-600">
              {tCommon("aboutUs.stats.satisfaction")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;
