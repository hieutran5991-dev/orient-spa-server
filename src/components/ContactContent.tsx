"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/utils/constants";
import type { ContactFormData } from "@/types/contact";
import type { NamespaceKeys } from "use-intl";
import Link from "next/link";
import Image from "next/image";
import { CONFIG } from "@/utils/constants";

const ContactContent = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("contact" as NamespaceKeys<string, string>);
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", title: "", content: "" });
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch (_) {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="title-container text-center">
        <h1 className="title-text">{t("title")}</h1>
      </div>

      <div className="s a3 text-center">
        <ul className="breadcrumb">
          <li>
            <Link href={`/${locale}`}>{tCommon("navigation.home")}</Link>
          </li>
          <li className="active">{t("title")}</li>
        </ul>
      </div>

      <div className="s sH">
        <div className="container">
          <div className="a5_m">
            <div className="a5_h text-center">
              <div className="a5_c">
                <h2 className="s_t2">{t("emailSection.title")}</h2>
                <p className="s_p">{t("emailSection.description")}</p>
              </div>
            </div>

            <div className="a5_b fl">
              <form
                onSubmit={handleSubmit}
                className="a5_f"
                id="fromContact"
                autoComplete="off"
                noValidate
              >
                <div className="form-group">
                  <span className="form-label">
                    {t("form.fullName")} <span>*</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder={t("form.fullName")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <span className="form-label">
                    {t("form.emailAddress")} <span>*</span>
                  </span>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder={t("form.emailAddress")}
                    maxLength={320}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <span className="form-label">
                    {t("form.title")} <span>*</span>
                  </span>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="title"
                    placeholder={t("form.title")}
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <span className="form-label">
                    {t("form.content")} <span>*</span>
                  </span>
                  <textarea
                    name="content"
                    cols={40}
                    rows={6}
                    className="form-control"
                    id="content"
                    placeholder={t("form.contentPlaceholder")}
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="a5_fu btn btn-1"
                  id="btnContact"
                  disabled={loading}
                >
                  {loading ? "Sending..." : t("form.send")}
                </button>

                {status.message && (
                  <div
                    className={`tw:mt-2 status-message ${
                      status.type === "success" ? "success" : "error"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>

              <div className="a5_d">
                <div className="a5_k">
                  <iframe
                    src={CONFIG.MAP_LOCATION}
                    width="100%"
                    height="355"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="a5_e">
                  <h3 className="a5_et">{CONFIG.SPA_NAME}</h3>
                  <ul className="a5_en">
                    <li>
                      <i className="fa fa-envelope-o tw:w-8"></i> {CONFIG.MAIL}
                    </li>
                    <li>
                      <Link
                        href="https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9"
                        className="hoverable-link"
                      >
                        <i className="fa fa-map-marker tw:w-8"></i> {CONFIG.SPA_LOCATION}
                      </Link>
                    </li>
                    <li>
                      <Link href={`tel:${CONFIG.PHONE_WITH_COUNTRY_CODE}`} className="hoverable-link">
                        <i className="fa fa-phone tw:w-8"></i> {CONFIG.PHONE_NUMBER}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="s sH a6 ct">
        <div className="container">
          <div className="a5_m">
            <div className="a5_h text-center">
              <div className="a5_c">
                <h2 className="s_t2">{t("phoneSection.title")}</h2>
                <p className="s_p">{t("phoneSection.description")}</p>
              </div>
            </div>
            <div className="tw:flex tw:items-center tw:justify-center tw:gap-6">
              <div>
                <Image
                  src="/images/reservations/line.png"
                  alt={t("qr.contact")}
                  width={200}
                  height={200}
                />
              </div>

              <div>
                <Image
                  src="/images/reservations/kk.png"
                  alt={t("qr.contact")}
                  width={200}
                  height={200}
                />
              </div>

              <div>
                <Image
                  src="/images/reservations/ws.png"
                  alt={t("qr.contact")}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactContent;
