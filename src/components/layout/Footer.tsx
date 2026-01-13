"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {useEffect, useState} from "react";
import { createPortal } from "react-dom";
import type { SpaLocation } from "@/types/api";
import type { NamespaceKeys } from "use-intl";
import {CONFIG, MAIN_HOST} from "@/utils/constants";
interface FooterProps {
  spaLocations: SpaLocation[];
}

const Footer = ({ spaLocations }: FooterProps) => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);

  const [isDisplaySenSpa, setIsDisplaySenSpa] = useState(false);
  const [showChatConfirm, setShowChatConfirm] = useState(false);
  const [pendingChatLink, setPendingChatLink] = useState<string | null>(null);
  const [pendingChatApp, setPendingChatApp] = useState<string>("");
  const [showCallConfirm, setShowCallConfirm] = useState(false);
  const [pendingCallLink, setPendingCallLink] = useState<string | null>(null);
  const [pendingCallPhone, setPendingCallPhone] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const handleChatClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string, appName: string) => {
    e.preventDefault();
    e.stopPropagation();
    const nativeEvent = e.nativeEvent;
    if (nativeEvent && typeof (nativeEvent as any).stopImmediatePropagation === 'function') {
      (nativeEvent as any).stopImmediatePropagation();
    }
    setPendingChatLink(link);
    setPendingChatApp(appName);
    setShowChatConfirm(true);
  };

  const handleCallClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string, phone: string) => {
    e.preventDefault();
    e.stopPropagation();
    const nativeEvent = e.nativeEvent;
    if (nativeEvent && typeof (nativeEvent as any).stopImmediatePropagation === 'function') {
      (nativeEvent as any).stopImmediatePropagation();
    }
    setPendingCallLink(link);
    setPendingCallPhone(phone);
    setShowCallConfirm(true);
  };

  const handleCancelChat = (e?: React.MouseEvent) => {
    setShowChatConfirm(false);
  };

  const handleCancelCall = (e?: React.MouseEvent) => {
    setShowCallConfirm(false);
  };

  useEffect(() => {
    if (showChatConfirm || showCallConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showChatConfirm, showCallConfirm]);

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
                            className="hoverable-link map-link"
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
              className="sP_i talk-link"
              data-app="KakaoTalk"
              onClick={(e) => handleChatClick(e, "https://qr.kakao.com/talk/LDai_5BIuEvHqivW1VkyKsw.sJs-", "KakaoTalk")}
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
              href={`https://wa.me/${CONFIG.PHONE}`}
              rel="nofollow"
              target="_blank"
              className="sP_i talk-link"
              data-app="WhatsApp"
              onClick={(e) => handleChatClick(e, `https://wa.me/${CONFIG.PHONE}`, "WhatsApp")}
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
              className="sP_i talk-link"
              data-app="Line"
              onClick={(e) => handleChatClick(e, "https://line.me/ti/p/lgR6MK5ug3", "Line")}
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
              href={`https://zalo.me/${CONFIG.PHONE}`}
              rel="nofollow"
              target="_blank"
              className="sP_i talk-link"
              data-app="Zalo"
              onClick={(e) => handleChatClick(e, `https://zalo.me/${CONFIG.PHONE}`, "Zalo")}
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
              className="sP_i tw:after:hidden talk-link"
              onClick={(e) => handleCallClick(e, `tel:${CONFIG.PHONE_WITH_COUNTRY_CODE}`, CONFIG.PHONE_WITH_COUNTRY_CODE)}
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

      {/* Chat Confirmation Modal */}
      {mounted && showChatConfirm && createPortal(
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
            onClick={(e) => handleCancelChat(e)}
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
            onClick={(e) => handleCancelChat(e)}
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
              {tCommon("chatConfirm.title")}
            </h3>
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1.4rem',
              lineHeight: '1.71428',
              textAlign: 'center'
            }}>
              {tCommon("chatConfirm.message", { app: pendingChatApp })}
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
                  handleCancelChat(e);
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
                {tCommon("chatConfirm.cancel")}
              </button>
              <a
                href={pendingChatLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // e.stopPropagation();
                  if (pendingChatLink) {
                    handleCancelChat();
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
                {tCommon("chatConfirm.confirm")}
              </a>
            </div>
            </div>
          </div>
        </div>
        </>,
        document.body
      )}

      {/* Call Confirmation Modal */}
      {mounted && showCallConfirm && createPortal(
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
            onClick={(e) => handleCancelCall(e)}
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
            onClick={(e) => handleCancelCall(e)}
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
              {tCommon("callConfirm.title")}
            </h3>
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1.4rem',
              lineHeight: '1.71428',
              textAlign: 'center'
            }}>
              {tCommon("callConfirm.message", { phone: pendingCallPhone })}
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
                  handleCancelCall(e);
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
                {tCommon("callConfirm.cancel")}
              </button>
              <a
                href={pendingCallLink || '#'}
                onClick={(e) => {
                  if (pendingCallLink) {
                    handleCancelCall();
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
                {tCommon("callConfirm.confirm")}
              </a>
            </div>
            </div>
          </div>
        </div>
        </>,
        document.body
      )}
    </footer>
  );
};

export default Footer;
