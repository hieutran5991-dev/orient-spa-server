import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/utils/constants";
import type { SpaLocation } from "@/types/api";
import type { NamespaceKeys } from "use-intl";
import { CONFIG } from "@/utils/constants";
interface FooterProps {
  spaLocations: SpaLocation[];
}

const Footer = ({ spaLocations }: FooterProps) => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;
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
                          Open daily from {`${location.open_time} - ${location.close_time}`}
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
                          <a
                            href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                            target="_blank"
                            rel="nofollow"
                          >
                            <i className="fa fa-map tw:w-8"></i>
                            {location.address}
                          </a>
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
                          <a href={`tel:${location.phone}`}>
                            <i className="fa fa-phone tw:w-8"></i>
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
                      <Link href={`/${locale}/page/about-us`}>
                        {tCommon("footer.navigation.aboutUs")}
                      </Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/services-prices`}>
                        {tCommon("footer.navigation.spaMenu")}
                      </Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/promotions`}>
                        {tCommon("footer.navigation.promotions")}
                      </Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/contact`}>
                        {tCommon("footer.navigation.contactUs")}
                      </Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/booking`}>
                        {tCommon("footer.navigation.bookOnline")}
                      </Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/blog`}>
                        {tCommon("footer.navigation.blogs")}
                      </Link>
                    </li>
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
              href="https://qr.kakao.com/talk/EicqtwXI6griqg1G99.rFTSkaJo-"
              rel="nofollow"
              target="_blank"
              className="sP_i"
            >
              <span>
                <i className="ic ic-talk"></i>
              </span>
            </a>
            <a
              href={`'https://wa.me/${CONFIG.PHONE_NUMBER}`}
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
              href={`https://zalo.me/${CONFIG.PHONE_NUMBER}`}
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
              href={`tel:${CONFIG.PHONE_NUMBER}`}
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
      </div>
    </footer>
  );
};

export default Footer;
