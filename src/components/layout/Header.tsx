"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { CONFIG, type Locale, MAP_LANGUAGE_TO_LOCALE_PATH } from "@/utils/constants";
import type { NamespaceKeys } from "use-intl";

const Header = () => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [isPromotionVisible, setIsPromotionVisible] = useState(true);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileAboutSubmenuOpen, setIsMobileAboutSubmenuOpen] = useState(['/about-us', '/customer-moment', '/gallery', '/blogs'].includes(pathname));
  const [showAddressConfirm, setShowAddressConfirm] = useState(false);
  const [pendingAddressLink, setPendingAddressLink] = useState<string | null>(null);
  const [pendingAddress, setPendingAddress] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const isActivePath = (path: string) => {
    if (!pathname) return false;
    if (path === "/about-us") {
      return ["/about-us", "/customer-moment", "/gallery", "/blogs"].includes(pathname);
    }


    const pathSegment = MAP_LANGUAGE_TO_LOCALE_PATH[locale];
    return (pathname.replace(`/${pathSegment}`, "") || "/") === path;
  };

  const getNavLinkClasses = (path: string) => {
    const baseClasses =
      "tw:px-3 tw:py-2 tw:text-[1.125em] tw:uppercase tw:tracking-wide tw:transition-colors tw:duration-200 tw:h-full header-nav-link";
    const activeClasses = "header-nav-link-active tw:font-semibold";

    return `${baseClasses} ${isActivePath(path) ? activeClasses : ""}`;
  };

  const getDropdownActiveClasses = (path: string) => {
    const baseClasses = "tw:block tw:px-6 tw:py-4 tw:text-14 tw:transition-colors tw:duration-150";
    const activeClasses = "tw:bg-pink-50 tw:text-[var(--main-color)] tw:font-medium";

    const pathSegment = MAP_LANGUAGE_TO_LOCALE_PATH[locale];
    return `${baseClasses} ${(pathname.replace(`/${pathSegment}`, "") || "/") === path ? activeClasses : "tw:text-gray-700 tw:hover:bg-gray-50"}`;
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

  const getMobileNavSubmenuLinkClasses = (path: string) => {
    const baseClasses =
      "tw:block tw:text-[1.025em] tw:transition-colors tw:duration-200 tw:tracking-wide";
    const activeClasses = "tw:text-[var(--main-color)] tw:font-semibold";
    const inactiveClasses = "tw:text-gray-900";

    const pathSegment = MAP_LANGUAGE_TO_LOCALE_PATH[locale];
    return `${baseClasses} ${
      (pathname.replace(`/${pathSegment}`, "") || "/") === path ? activeClasses : inactiveClasses
    }`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (showAddressConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAddressConfirm]);

  const handleAddressClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string, address: string) => {
    e.preventDefault();
    e.stopPropagation();
    const nativeEvent = e.nativeEvent;
    if (nativeEvent && typeof (nativeEvent as any).stopImmediatePropagation === 'function') {
      (nativeEvent as any).stopImmediatePropagation();
    }
    setPendingAddressLink(link);
    setPendingAddress(address);
    setShowAddressConfirm(true);
  };

  const handleCancelAddress = (e?: React.MouseEvent) => {
    setShowAddressConfirm(false);
    setPendingAddressLink(null);
    setPendingAddress("");
  };

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

  // Close desktop dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isAboutDropdownOpen && !target.closest(".about-dropdown-container")) {
        setIsAboutDropdownOpen(false);
      }
      if (
        isLanguageDropdownOpen &&
        !target.closest(".language-dropdown-container")
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isAboutDropdownOpen, isLanguageDropdownOpen]);

  const handleLanguageChange = (newLocale: Locale) => {
    const segments = pathname.split("/");

    if (segments[1] && ['en', 'jp', 'kr'].includes(segments[1])) {
      segments.splice(1, 1);
    }

    const pathSegment = MAP_LANGUAGE_TO_LOCALE_PATH[newLocale];
    window.location.href = `/${pathSegment}${segments.join("/")}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutSubmenuOpen(false);
  };

  const toggleMobileLanguage = () => {
    setIsMobileLanguageOpen(!isMobileLanguageOpen);
  };

  const closeMobileLanguage = () => {
    setIsMobileLanguageOpen(false);
  };

  const toggleMobileAboutSubmenu = () => {
    setIsMobileAboutSubmenuOpen(!isMobileAboutSubmenuOpen);
  };

  const toggleAboutDropdown = () => {
    const newState = !isAboutDropdownOpen;
    setIsAboutDropdownOpen(newState);
    setIsLanguageDropdownOpen(false);
  };

  const handleAboutMouseLeave = () => {
    if (isAboutDropdownOpen) {
      setTimeout(() => {
        setIsAboutDropdownOpen(false);
      }, 100);
    }
  };

  const toggleLanguageDropdown = () => {
    const newState = !isLanguageDropdownOpen;
    setIsLanguageDropdownOpen(newState);
    setIsAboutDropdownOpen(false);
  };

  const handleLanguageMouseLeave = () => {
    if (isLanguageDropdownOpen) {
      setTimeout(() => {
        setIsLanguageDropdownOpen(false);
      }, 100);
    }
  };

  return (
    <>
      {/* {isPromotionVisible && (
        <div className="tw:bg-gradient-to-r tw:from-[#9e2265] tw:via-[#b12876] tw:to-[#c42e87] tw:text-white tw:py-4 tw:relative">
          <div className="tw:text-center tw:pl-1 tw:pr-11 tw:md:px-4 tw:lg:px-6">
            <strong style={{ color: "#f3f900" }}>HOT⚡</strong>
            <span className="tw:text-white tw:font-medium">
              {" "}
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
      )} */}

      <div className="tw:bg-white tw:border-b tw:border-gray-200 tw:py-6">
        <div className="tw:max-w-[1200px] tw:px-4 tw:flex tw:items-center tw:mx-auto tw:text-2xl">
          <div className="tw:flex tw:items-center tw:justify-center tw:md:justify-start tw:space-x-6 tw:w-full">
            <div className="tw:hidden tw:md:flex tw:items-center tw:gap-2">
              <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                <i className="fa fa-envelope-o tw:text-white tw:text-[17px]" />
              </div>
              <span style={{ fontSize: "14px", color: "#333" }}>
                {CONFIG.MAIL}
              </span>
            </div>

            <div className="tw:ml-auto">
              <a className="map-link"
                href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                target="_blank"
                rel="nofollow"
                onClick={(e) => handleAddressClick(e, "https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9", CONFIG.SPA_LOCATION)}
              >
                <div className="tw:flex tw:items-center tw:gap-2">
                  <div className="tw:w-[28px] tw:h-[28px] tw:leading-[28px] tw:text-center tw:bg-[var(--main-color)] tw:rounded-full">
                    <i className="fa fa-map-marker tw:text-white tw:text-[17px]" />
                  </div>
                  <span
                    className="tw:hidden tw:md:block hoverable-link"
                    style={{ fontSize: "14px", color: "#333" }}
                  >
                    {CONFIG.SPA_LOCATION}
                  </span>
                  <span
                    className="tw:block tw:md:hidden hoverable-link"
                    style={{ fontSize: "14px", color: "#333" }}
                  >
                    {tCommon("footer.findUs")}
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
                href="/menu-prices"
                className={getNavLinkClasses("/menu-prices")}
              >
                {tCommon("navigation.services")}
              </a>
              <a
                href={`/featured-products`}
                className={getNavLinkClasses(`/featured-products`)}
              >
                {tCommon("navigation.featuredProducts")}
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
              <div
                className={`tw:h-full tw:relative tw:group about-dropdown-container ${isActivePath('/about-us') ? 'header-nav-link-active' : 'header-nav-link'}`}
                onMouseLeave={handleAboutMouseLeave}
              >
                <button
                  onClick={toggleAboutDropdown}
                  className="tw:flex tw:items-center tw:space-x-1 tw:text-gray-800 tw:hover:text-pink-600 tw:px-3 tw:py-2 tw:text-[1.125em] tw:uppercase tw:tracking-wide tw:transition-colors tw:duration-200 tw:cursor-pointer"
                >
                  <span className={`tw:self-start ${isActivePath('/about-us') ? 'tw:text-[var(--main-color)]' : ''}`}>
                    {tCommon("navigation.aboutUs")}
                  </span>
                  <svg
                    className={`tw:w-4 tw:h-4 tw:transition-transform tw:duration-200 ${
                      isAboutDropdownOpen
                        ? "tw:rotate-180"
                        : "tw:group-hover:rotate-180"
                    } ${isActivePath('/about-us') ? 'tw:text-[var(--main-color)]' : ''}`}
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
                  className={`tw:absolute tw:top-full tw:py-2 tw:left-0 tw:w-83 tw:bg-white tw:shadow-lg tw:border tw:border-gray-200 tw:transition-all tw:duration-200 tw:z-50 ${
                    isAboutDropdownOpen
                      ? "tw:opacity-100 tw:visible"
                      : "tw:opacity-0 tw:invisible tw:group-hover:opacity-100 tw:group-hover:visible"
                  }`}
                >
                  <div className="tw:px-3 tw:py-2">
                    <a
                      href="/about-us"
                      className={getDropdownActiveClasses('/about-us')}
                    >
                      {tCommon("navigation.aboutDropdown.aboutSpa")}
                    </a>
                    <a
                      href="/customer-moment"
                      className={getDropdownActiveClasses('/customer-moment')}
                    >
                      {tCommon("navigation.aboutDropdown.ourHappyGuests")}
                    </a>
                    <a
                      href="/gallery"
                      className={getDropdownActiveClasses('/gallery')}
                    >
                      {tCommon("navigation.aboutDropdown.gallery")}
                    </a>
                    {/* <a
                      href="/blogs"
                      className={getDropdownActiveClasses('/blogs')}
                    >
                      {tCommon("navigation.aboutDropdown.blogs")}
                    </a> */}
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

              <div
                className="tw:h-full tw:relative tw:group header-nav-link language-dropdown-container"
                onMouseLeave={handleLanguageMouseLeave}
              >
                <button
                  onClick={toggleLanguageDropdown}
                  className="tw:flex tw:items-start tw:space-x-2 tw:text-gray-800 tw:hover:text-pink-600 tw:px-3 tw:py-2 tw:text-2xl tw:transition-colors tw:duration-200 tw:cursor-pointer"
                >
                  <div className="tw:relative">
                    <i className="ic ic-language"></i>
                  </div>
                </button>

                <div
                  className={`tw:absolute tw:py-2 tw:top-full tw:right-0 tw:w-80 tw:bg-white tw:shadow-lg tw:border tw:border-gray-200 tw:transition-all tw:duration-200 tw:z-50 ${
                    isLanguageDropdownOpen
                      ? "tw:opacity-100 tw:visible"
                      : "tw:opacity-0 tw:invisible tw:group-hover:opacity-100 tw:group-hover:visible"
                  }`}
                >
                  <div className="tw:px-3 tw:py-2">
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`tw:w-full tw:text-left tw:px-6 tw:py-4 tw:text-14 tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "en"
                          ? "tw:bg-pink-50 tw:text-[var(--main-color)] tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇺🇸 {tCommon("languages.en")}
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ja")}
                      className={`tw:w-full tw:text-left tw:px-6 tw:py-4 tw:text-14 tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "ja"
                          ? "tw:bg-pink-50 tw:text-[var(--main-color)] tw:font-medium"
                          : "tw:text-gray-700 tw:hover:bg-gray-50"
                      }`}
                    >
                      🇯🇵 {tCommon("languages.ja")}
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ko")}
                      className={`tw:w-full tw:text-left tw:px-6 tw:py-4 tw:text-14 tw:transition-colors tw:duration-150 tw:cursor-pointer ${
                        locale === "ko"
                          ? "tw:bg-pink-50 tw:text-[var(--main-color)] tw:font-medium"
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
              className="tw:text-[var(--main-color)] tw:hover:text-pink-700 tw:p-2 tw:rounded-md tw:transition-colors tw:duration-200 tw:cursor-pointer"
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
              <a href="/" className="tw:flex tw:items-center">
                <Image
                  src="/images/logo.jpeg"
                  alt="SEN SPA Da Nang"
                  width={200}
                  height={32}
                  className="tw:h-30 md:tw:h-20 tw:w-auto tw:object-contain"
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
                          ? "tw:bg-pink-50 tw:text-[var(--main-color)] tw:font-medium"
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
                          ? "tw:bg-pink-50 tw:text-[var(--main-color)] tw:font-medium"
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
                          ? "tw:bg-pink-50 tw:text-[var(--main-color)] tw:font-medium"
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
              className="tw:text-[var(--main-color)] tw:hover:text-pink-700 tw:p-2 tw:rounded-md tw:transition-colors tw:duration-200 tw:cursor-pointer"
              aria-label="Close mobile menu"
            >
              <svg
                className="tw:w-9 tw:h-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="tw:px-11 tw:py-8">
            <ul className="tw:space-y-6">
              <li>
                <a
                  href="/"
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses('/')}
                >
                  {tCommon("navigation.home")}
                </a>
              </li>
              <li>
                <a
                  href="/menu-prices"
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(
                    '/menu-prices'
                  )}
                >
                  {tCommon("navigation.services")}
                </a>
              </li>
              <li>
                <a
                  href="/featured-products"
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses(
                    '/featured-products'
                  )}
                >
                  {tCommon("navigation.featuredProducts")}
                </a>
              </li>
              <li>
                <div 
                  className="tw:flex tw:items-center tw:justify-between"
                  onClick={toggleMobileAboutSubmenu}
                >
                  <span className={getMobileNavLinkClasses(
                    '/about-us'
                  )}>
                    {tCommon("navigation.aboutUs")}
                  </span>
                  <svg
                    className={`tw:w-4 tw:h-4 tw:transition-transform tw:duration-200 ${
                      isMobileAboutSubmenuOpen
                        ? "tw:rotate-180"
                        : ""
                    }`}
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
                </div>
                {isMobileAboutSubmenuOpen && (
                  <ul className="tw:mt-4 tw:ml-4 tw:space-y-3">
                    <li>
                      <a
                        href="/about-us"
                        onClick={closeMobileMenu}
                        className={getMobileNavSubmenuLinkClasses('/about-us')}
                      >
                        {tCommon("navigation.aboutDropdown.aboutSpa")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/customer-moment"
                        onClick={closeMobileMenu}
                        className={getMobileNavSubmenuLinkClasses(`/customer-moment`)}
                      >
                        {tCommon("navigation.aboutDropdown.ourHappyGuests")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="/gallery"
                        onClick={closeMobileMenu}
                        className={getMobileNavSubmenuLinkClasses('/gallery')}
                      >
                        {tCommon("navigation.aboutDropdown.gallery")}
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href="/blogs"
                        onClick={closeMobileMenu}
                        className={getMobileNavSubmenuLinkClasses('/blogs')}
                      >
                        {tCommon("navigation.aboutDropdown.blogs")}
                      </a>
                    </li> */}
                  </ul>
                )}
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses('/contact')}
                >
                  {tCommon("navigation.contact")}
                </a>
              </li>
              <li>
                <a
                  href="/reservation"
                  onClick={closeMobileMenu}
                  className={getMobileNavLinkClasses('/reservation')}
                >
                  {tCommon("navigation.bookOnline")}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Address Confirmation Modal */}
      {mounted && showAddressConfirm && createPortal(
        <>
          <style>{`
            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              padding: '1rem'
            }}
            onClick={(e) => handleCancelAddress(e)}
          >
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 99998,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease'
            }}
            onClick={(e) => handleCancelAddress(e)}
          ></div>
          <div 
            style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              maxWidth: '32rem',
              width: '100%',
              padding: 0,
              zIndex: 100000,
              animation: 'fadeInScale 0.2s ease-out',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '2rem',
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              padding: '1.5rem 2rem',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              backgroundColor: 'var(--main-color)',
              borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
              width: '100%',
              boxSizing: 'border-box',
              boxShadow: '0 4px 6px -1px rgba(158, 34, 101, 0.3), 0 2px 4px -1px rgba(158, 34, 101, 0.2)'
            }}>
              {tCommon("addressConfirm.title")}
            </h3>
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1.4rem',
              lineHeight: '1.71428',
              textAlign: 'center'
            }}>
              {tCommon("addressConfirm.message", { address: pendingAddress })}
            </p>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelAddress(e);
                }}
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  color: '#374151',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }}
              >
                {tCommon("addressConfirm.cancel")}
              </button>
              <a
                href={pendingAddressLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (pendingAddressLink) {
                    handleCancelAddress();
                  } else {
                    e.preventDefault();
                  }
                }}
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  color: '#ffffff',
                  backgroundColor: 'var(--main-color)',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px -1px rgba(158, 34, 101, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.95';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(158, 34, 101, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(158, 34, 101, 0.3)';
                }}
              >
                {tCommon("addressConfirm.confirm")}
              </a>
            </div>
            </div>
          </div>
        </div>
        </>,
        document.body
      )}
    </>
  );
};

export default Header;
