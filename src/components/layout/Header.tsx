"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { CONFIG, type Locale, SUPPORTED_LANGUAGE } from "@/utils/constants";
import type { NamespaceKeys } from "use-intl";

const Header = () => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [isPromotionVisible, setIsPromotionVisible] = useState(true);

  const isActivePath = (path: string) => {
    if (!pathname) return false;
    return (pathname.replace(`/${locale}`, "") || "/") === path;
  };

  const getNavLinkClasses = (path: string) => {
    const baseClasses =
      "tw:px-3 tw:py-2 tw:text-[1.125em] tw:uppercase tw:tracking-wide tw:transition-colors tw:duration-200 tw:h-full header-nav-link";
    const activeClasses = "header-nav-link-active tw:font-semibold";

    return `${baseClasses} ${isActivePath(path) ? activeClasses : ""}`;
  };

  const getMobileNavLinkClasses = (path: string) => {
    const baseClasses =
      "tw:block tw:text-[1.125em] tw:font-medium tw:transition-colors tw:duration-200 tw:uppercase tw:tracking-wide";
    const activeClasses = "header-nav-link-active tw:font-semibold";
    const inactiveClasses = "tw:text-gray-900 header-nav-link-active";

    return `${baseClasses} ${
      isActivePath(path) ? activeClasses : inactiveClasses
    }`;
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobileLanguageOpen &&
        !target.closest(".mobile-language-switcher")
      ) {
        setIsMobileLanguageOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileLanguageOpen]);

  const handleLanguageChange = (newLocale: Locale) => {
    const segments = pathname.split("/");
    if (SUPPORTED_LANGUAGE.includes(segments[1] as Locale)) {
      segments.splice(1, 1);
    }
    window.location.href = `/${newLocale}${segments.join("/")}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileLanguage = () => {
    setIsMobileLanguageOpen(!isMobileLanguageOpen);
  };

  const closeMobileLanguage = () => {
    setIsMobileLanguageOpen(false);
  };

  return (
    <>
      {isPromotionVisible && (
        <div className="tw:bg-gradient-to-r tw:from-[#9e2265] tw:via-[#b12876] tw:to-[#c42e87] tw:text-white tw:py-4 tw:relative">
          <div className="tw:text-center tw:px-4">
            <span className="tw:text-white tw:font-medium">
              {tCommon("promotion.happyHour")}
            </span>
          </div>

          <button
            onClick={() => setIsPromotionVisible(false)}
            className="tw:absolute tw:right-4 tw:top-1/2 tw:transform tw:-translate-y-1/2 tw:text-white tw:hover:text-gray-200 tw:cursor-pointer"
          >
            <svg
              className="tw:w-6 tw:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="tw:bg-white tw:border-b tw:border-gray-200 tw:py-6">
        <div className="tw:max-w-[1200px] tw:px-4 tw:flex tw:items-center tw:mx-auto tw:text-2xl">
          <div className="tw:flex tw:items-center tw:justify-center tw:md:justify-start tw:space-x-6 tw:w-full">
            <div className="tw:flex tw:items-center tw:gap-2 tw:mr-12">
              <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                <i className="fa fa-phone tw:text-white tw:text-[17px]" />
              </div>
              <span style={{ fontSize: "14px", color: "#333" }}>
                <a href={`tel:${CONFIG.PHONE_NUMBER}`}>{CONFIG.PHONE_NUMBER}</a>
              </span>
            </div>

            <div className="tw:hidden tw:md:flex tw:items-center tw:gap-2">
              <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                <i className="fa fa-envelope-o tw:text-white tw:text-[17px]" />
              </div>
              <span style={{ fontSize: "14px", color: "#333" }}>
                {CONFIG.MAIL}
              </span>
            </div>

            <div className="tw:ml-auto">
              <a
                href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                target="_blank"
                rel="nofollow"
              >
                <div className="tw:flex tw:items-center tw:gap-2">
                  <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                    <i className="fa fa-map-marker tw:text-white tw:text-[17px]" />
                  </div>
                  <span className="tw:hidden tw:md:block" style={{ fontSize: "14px", color: "#333" }}>
                    {CONFIG.SPA_LOCATION}
                  </span>
                  <span className="tw:block tw:md:hidden" style={{ fontSize: "14px", color: "#333" }}>
                    {tCommon("footer.viewMap")}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className="tw:hidden tw:lg:block tw:bg-white">
        <div className="tw:max-w-[1210px] tw:mx-auto tw:px-4 sm:tw:px-6 tw:lg:px-8">
          <div className="tw:flex tw:md:h-[120px] tw:gap-12 tw:justify-center tw:items-center">
            <nav className="tw:flex tw:items-start tw:md:h-[50%] tw:border-b tw:border-gray-200 tw:gap-8 tw:w-[40%] tw:justify-end">
              <a href="/" className={getNavLinkClasses(`/`)}>
                {tCommon("navigation.home")}
              </a>
              <a
                href="/services-prices"
                className={getNavLinkClasses("/services-prices")}
              >
                {tCommon("navigation.services")}
              </a>
              <a
                href={`/promotions`}
                className={getNavLinkClasses(`/promotions`)}
              >
                {tCommon("navigation.promotions")}
              </a>
            </nav>

            <div className="tw:flex tw:items-center tw:space-x-3 tw:h-full tw:flex-1">
              <a href="/" className="tw:flex tw:items-center tw:h-full">
                <Image
                  src="/images/logo.jpeg"
                  alt="SEN SPA Da Nang"
                  width={200}
                  height={32}
                  className="tw:w-auto tw:object-cover tw:max-h-full"
                />
              </a>
            </div>

            <nav className="tw:flex tw:items-start tw:md:h-[55%] tw:border-b tw:border-gray-200 tw:gap-8 tw:w-[40%] tw:justify-start">
              <div className="tw:h-full tw:relative tw:group header-nav-link">
                <button className="tw:flex tw:items-center tw:space-x-1 tw:text-gray-800 tw:hover:text-pink-600 tw:px-3 tw:py-2 tw:text-[1.125em] tw:uppercase tw:tracking-wide tw:transition-colors tw:duration-200 tw:cursor-pointer">
                  <span className="tw:self-start">
                    {tCommon("navigation.aboutUs")}
                  </span>
                  <svg
                    className="tw:w-4 tw:h-4 tw:transition-transform tw:duration-200 tw:group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`tw:absolute tw:top-full tw:left-0 tw:mt-1 tw:w-83 tw:bg-white tw:rounded-lg tw:shadow-lg tw:border tw:border-gray-200 tw:opacity-0 tw:invisible tw:group-hover:opacity-100 tw:group-hover:visible tw:transition-all tw:duration-200 tw:z-50`}
                >
                  <div className="tw:py-2">
                    <a
                      href="/about-us"
                      className="tw:block tw:px-6 tw:py-4 tw:text-14 tw:text-gray-700 tw:hover:bg-pink-50 tw:hover:text-pink-600 tw:transition-colors tw:duration-150"
                    >
                      {tCommon("navigation.aboutDropdown.aboutSpa")}
                    </a>
                    <div className="tw:border-t tw:border-gray-100 tw:my-1"></div>
                    <a
                      href="/gallery"
                      className="tw:block tw:px-6 tw:py-4 tw:text-14 tw:text-gray-700 tw:hover:bg-pink-50 tw:hover:text-pink-600 tw:transition-colors tw:duration-150"
                    >
                      {tCommon("navigation.aboutDropdown.ourHappyGuests")}
                    </a>
                    <div className="tw:border-t tw:border-gray-100 tw:my-1"></div>
                    <a
                      href={`/${locale}/blogs`}
                      className="tw:block tw:px-6 tw:py-4 tw:text-14 tw:text-gray-700 tw:hover:bg-pink-50 tw:hover:text-pink-600 tw:transition-colors tw:duration-150"
                    >
                      {tCommon("navigation.aboutDropdown.blogs")}
                    </a>
                  </div>
                </div>
              </div>

              <a href={`/contact`} className={getNavLinkClasses(`/contact`)}>
                {tCommon("navigation.contact")}
              </a>

              <a
                href={`/reservation`}
                className={getNavLinkClasses(`/reservation`)}
              >
                {tCommon("navigation.bookOnline")}
              </a>

              <div className="tw:h-full tw:relative tw:group header-nav-link">
                <button className="tw:flex tw:items-start tw:space-x-2 tw:text-gray-800 tw:hover:text-pink-600 tw:px-3 tw:py-2 tw:text-2xl tw:transition-colors tw:duration-200 tw:cursor-pointer">
                  <div className="tw:relative">
                    <i className="ic ic-language"></i>
                  </div>
                </button>

                {/* Language Dropdown */}
                <div className="tw:absolute tw:top-full tw:right-0 tw:mt-1 tw:w-80 tw:bg-white tw:rounded-lg tw:shadow-lg tw:border tw:border-gray-200 tw:opacity-0 tw:invisible tw:group-hover:opacity-100 tw:group-hover:visible tw:transition-all tw:duration-200 tw:z-50">
                  <div className="tw:py-2">
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`tw:w-full tw:text-left tw:px-6 tw:py-4 tw:text-14 tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "en"
                          ? "tw:bg-pink-50 tw:text-pink-600 tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇺🇸 {tCommon("languages.en")}
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ja")}
                      className={`tw:w-full tw:text-left tw:px-6 tw:py-4 tw:text-14 tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "ja"
                          ? "tw:bg-pink-50 tw:text-pink-600 tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇯🇵 {tCommon("languages.ja")}
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ko")}
                      className={`tw:w-full tw:text-left tw:px-6 tw:py-4 tw:text-14 tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "ko"
                          ? "tw:bg-pink-50 tw:text-pink-600 tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇰🇷 {tCommon("languages.ko")}
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <header className="tw:lg:hidden tw:bg-white tw:border-b tw:border-gray-200 tw:shadow-sm">
        <div className="tw:px-4">
          <div className="tw:flex tw:items-center tw:justify-between">
            <button
              onClick={toggleMobileMenu}
              className="tw:text-pink-600 tw:hover:text-pink-700 tw:p-2 tw:rounded-md tw:transition-colors tw:duration-200 tw:cursor-pointer"
              aria-label="Open mobile menu"
            >
              <svg
                className="tw:w-12 tw:h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="tw:flex tw:flex-col tw:items-center">
              <a href={`/${locale}`} className="tw:flex tw:items-center">
                <Image
                  src="/images/logo.jpeg"
                  alt="SEN SPA Da Nang"
                  width={200}
                  height={32}
                  className="tw:h-20 tw:w-auto tw:object-contain"
                />
              </a>
            </div>

            {/* Mobile Language Switcher */}
            <div className="mobile-language-switcher tw:relative">
              <button
                onClick={toggleMobileLanguage}
                className="tw:flex tw:items-center tw:space-x-2 tw:text-gray-800 tw:hover:text-pink-600 tw:p-2 tw:text-2xl tw:transition-colors tw:duration-200 tw:cursor-pointer"
              >
                <div className="tw:relative">
                  <i className="ic ic-language"></i>
                </div>
              </button>

              {/* Mobile Language Dropdown */}
              {isMobileLanguageOpen && (
                <div className="tw:absolute tw:top-full tw:right-0 tw:mt-2 tw:w-48 tw:bg-white tw:rounded-lg tw:shadow-lg tw:border tw:border-gray-200 tw:z-50">
                  <div className="tw:py-2">
                    <button
                      onClick={() => {
                        handleLanguageChange("en");
                        closeMobileLanguage();
                      }}
                      className={`tw:w-full tw:text-left tw:px-4 tw:py-2 tw:text-lg tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "en"
                          ? "tw:bg-pink-50 tw:text-pink-600 tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇺🇸 {tCommon("languages.en")}
                    </button>
                    <button
                      onClick={() => {
                        handleLanguageChange("ja");
                        closeMobileLanguage();
                      }}
                      className={`tw:w-full tw:text-left tw:px-4 tw:py-2 tw:text-lg tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "ja"
                          ? "tw:bg-pink-50 tw:text-pink-600 tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇯🇵 {tCommon("languages.ja")}
                    </button>
                    <button
                      onClick={() => {
                        handleLanguageChange("ko");
                        closeMobileLanguage();
                      }}
                      className={`tw:w-full tw:text-left tw:px-4 tw:py-2 tw:text-lg tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "ko"
                          ? "tw:bg-pink-50 tw:text-pink-600 tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇰🇷 {tCommon("languages.ko")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="tw:lg:hidden tw:fixed tw:inset-0 tw:z-50 tw:bg-white">
          {/* Close Button */}
          <div className="tw:flex tw:justify-end tw:p-4">
            <button
              onClick={closeMobileMenu}
              className="tw:text-pink-600 tw:hover:text-pink-700 tw:p-2 tw:rounded-md tw:transition-colors tw:duration-200 tw:cursor-pointer"
              aria-label="Close mobile menu"
            >
              <svg
                className="tw:w-8 tw:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="tw:px-4 tw:py-8">
            <ul className="tw:space-y-6">
              <li>
                <a
                  href={`/${locale}`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}`)}
                >
                  {tCommon("navigation.home")}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/services-prices`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(
                    `/${locale}/services-prices`
                  )}
                >
                  {tCommon("navigation.services")}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/promotions`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}/promotions`)}
                >
                  {tCommon("navigation.promotions")}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/about-us`}
                  onClick={closeMobileMenu}
                  className="tw:block tw:text-[1.125em] tw:text-gray-900 tw:transition-colors tw:duration-200 tw:uppercase tw:tracking-wide"
                >
                  {tCommon("navigation.aboutUs")}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/contact`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}/contact`)}
                >
                  {tCommon("navigation.contact")}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/reservation`}
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(`/${locale}/reservation`)}
                >
                  {tCommon("navigation.bookOnline")}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
