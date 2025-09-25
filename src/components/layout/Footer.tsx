"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {useEffect, useState} from "react";
import type { SpaLocation } from "@/types/api";
import type { NamespaceKeys } from "use-intl";
import {CONFIG, MAIN_HOST} from "@/utils/constants";
interface FooterProps {
  spaLocations: SpaLocation[];
}

const Footer = ({ spaLocations }: FooterProps) => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);

  const [isDisplaySenSpa, setIsDisplaySenSpa] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    setIsDisplaySenSpa(hostname !== MAIN_HOST)
  }, []);

  useEffect(() => {
    const handleScrollToTop = () => {
      const toTopButton = document.getElementById("toTop");
      if (toTopButton) {
        toTopButton.addEventListener("click", function () {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }
    };

    handleScrollToTop();
  }, []);

  return (
    <footer className="f">
      <div className="f_m">
        <div className="container">
          <div className="f_mw">
            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">{tCommon("footer.locations")}</h4>
                <div className="f_c">
                  {spaLocations.map((location) => (
                    <div key={location.id}>
                      {/* Operating Hours */}
                      <div className="footer-contact-item">
                        <div className="footer-contact-icon">
                          <i
                            className="fa fa-clock-o"
                            style={{ color: "white", fontSize: "17px" }}
                          ></i>
                        </div>
                        <span style={{ fontSize: "14px", color: "#333" }}>
                          {/* Open daily from {`${location.open_time} - ${location.close_time}`} */}
                          Open daily from 10:0AM - 09:00PM
                        </span>
                      </div>

                      {/* Address */}
                      <div className="footer-contact-item">
                        <div className="footer-contact-icon">
                          <i
                            className="fa fa-map-marker"
                            style={{ color: "white", fontSize: "17px" }}
                          ></i>
                        </div>
                        <span style={{ fontSize: "14px", color: "#333" }}>
                          <Link
                            href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                            rel="nofollow"
                            target="_blank"
                            className="hoverable-link"
                          >
                            {location.address}
                          </Link>
                        </span>
                      </div>

                      {/* Email */}
                      <div className="footer-contact-item">
                        <div className="footer-contact-icon">
                          <i
                            className="fa fa-envelope-o"
                            style={{ color: "white", fontSize: "17px" }}
                          ></i>
                        </div>
                        <span style={{ fontSize: "14px", color: "#333" }}>
                          {CONFIG.MAIL}
                        </span>
                      </div>

                      {/* Phone */}
                      <div className="footer-contact-item">
                        <div className="footer-contact-icon">
                          <i
                            className="fa fa-phone"
                            style={{ color: "white", fontSize: "17px" }}
                          ></i>
                        </div>
                        <span style={{ fontSize: "14px", color: "#333" }}>
                          <a
                            href={`tel:${location.phone}`}
                            className="hoverable-link"
                          >
                            {location.phone}
                          </a>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">{CONFIG.SPA_NAME}</h4>
                <div className="f_c">
                  <ul className="f_n fl">
                    <li className="tw:w-[50%]">
                      <a
                        href="/about-us"
                        className="hoverable-link"
                      >
                        {tCommon("footer.navigation.aboutUs")}
                      </a>
                    </li>
                    <li className="tw:w-[50%]">
                      <a
                        href="/menu-prices"
                        className="hoverable-link"
                      >
                        {tCommon("footer.navigation.spaMenu")}
                      </a>
                    </li>
                    <li className="tw:w-[50%]">
                      <a
                        href="/featured-products"
                        className="hoverable-link"
                      >
                        {tCommon("footer.navigation.featuredProducts")}
                      </a>
                    </li>
                    <li className="tw:w-[50%]">
                      <a href="/contact" className="hoverable-link">
                        {tCommon("footer.navigation.contactUs")}
                      </a>
                    </li>
                    <li className="tw:w-[50%]">
                      <a
                        href="/reservation"
                        className="hoverable-link"
                      >
                        {tCommon("footer.navigation.bookOnline")}
                      </a>
                    </li>
                    {/* <li className="tw:w-[50%]">
                      <a href="/blogs" className="hoverable-link">
                        {tCommon("footer.navigation.blogs")}
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">{tCommon("footer.followUs")}</h4>
                <div className="f_c">
                  <div className="f_s fl">
                    <span>
                      <a
                        href="https://www.facebook.com/p/Sen-Spa-%C4%90%C3%A0-N%E1%BA%B5ng-61554952904145/"
                        target="_blank"
                        rel="nofollow"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </span>
                    <span>
                      <a
                        href="https://www.instagram.com/senspadanang21"
                        target="_blank"
                        rel="nofollow"
                      >
                        <i className="fa fa-instagram"></i>
                      </a>
                    </span>
                    <span>
                      <a
                        href="https://www.tripadvisor.com.vn/Attraction_Review-g298085-d28147710-Reviews-Sen_Spa_Da_Nang-Da_Nang.html"
                        target="_blank"
                        rel="nofollow"
                      >
                        <i className="fa fa-tripadvisor"></i>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">{tCommon("footer.paymentMethods")}</h4>
                <div className="f_c">
                  <Image
                    src="/fonts/payment-methods.svg"
                    alt="Payment Methods"
                    width={200}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sP" id="footer_tool">
            <div className="sP_i" id="toTop">
              <span>
                <i className="fa fa-angle-up"></i>
              </span>
            </div>
            <a
              href="https://qr.kakao.com/talk/LDai_5BIuEvHqivW1VkyKsw.sJs-"
              rel="nofollow"
              target="_blank"
              className="sP_i"
            >
              <span>
              <span>
                <Image
                  src="/fonts/kakaotalk-logo.svg"
                  alt="Kakao Talk"
                  width={24}
                  height={24}
                />
              </span>
              </span>
            </a>
            <a
              href={'https://wa.me/84976591515'}
              rel="nofollow"
              target="_blank"
              className="sP_i"
            >
              <span>
                <Image
                  src="/fonts/whatsapp-icon.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                />
              </span>
            </a>
            <a
              href="https://line.me/ti/p/lgR6MK5ug3"
              rel="nofollow"
              target="_blank"
              className="sP_i"
            >
              <span>
                <Image
                  src="/fonts/line-logo.svg"
                  alt="Zalo"
                  width={24}
                  height={24}
                />
              </span>
            </a>
            <a
              href={`https://zalo.me/${CONFIG.PHONE_WITH_COUNTRY_CODE}`}
              rel="nofollow"
              target="_blank"
              className="sP_i"
            >
              <span>
                <Image
                  src="/fonts/zalo-icon.svg"
                  alt="Zalo"
                  width={24}
                  height={24}
                />
              </span>
            </a>
            <a
              href={`tel:${CONFIG.PHONE_WITH_COUNTRY_CODE}`}
              className="sP_i tw:after:hidden"
            >
              <span>
                <i className="ic ic-phone"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="f_e">
        <div className="tw:text-center tw:md:flex tw:justify-center tw:items-center tw:gap-2">
          <div>{tCommon("footer.copyrightLine1")}</div>
          <div>{tCommon("footer.copyrightLine2")}</div>
        </div>

        {isDisplaySenSpa && (
          <div className="tw:text-center">
            {tCommon("footer.copyrightLine3")}{" "}
            <a
              className="tw:text-[var(--main-color)] tw:hover:underlink"
              href="https://senspadanang.com"
              rel="dofollow"
            >
              {tCommon("footer.copyrightLine4")}
            </a>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
