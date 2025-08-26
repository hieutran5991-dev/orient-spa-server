'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import type { ContactFormData } from '@/types/contact';
import type {NamespaceKeys} from "use-intl";
import Link from 'next/link';
import Image from 'next/image';

const ContactContent = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations('contact' as NamespaceKeys<string, string>);
  const tCommon = useTranslations('common' as NamespaceKeys<string, string>);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    title: '',
    content: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', title: '', content: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (_) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="s a2 text-center" data-bis-skin-checked="1">
        <h1 className="a2_t">{t('title')}</h1>
      </div>

      <div className="s a3 text-center" data-bis-skin-checked="1">
        <ul className="breadcrumb">
          <li><Link href={`/${locale}`}>{tCommon('navigation.home')}</Link></li>
          <li className="active">{t('title')}</li>
        </ul>
      </div>

      <div className="s sH a5" data-bis-skin-checked="1">
        <div className="container" data-bis-skin-checked="1">
          <div className="a5_m" data-bis-skin-checked="1">
            <div className="a5_h text-center" data-bis-skin-checked="1">
              <div className="a5_a" data-bis-skin-checked="1">
                <i className="fa fa-envelope-o"></i>
              </div>
              <div className="a5_c" data-bis-skin-checked="1">
                <h2 className="s_t2">{t('emailSection.title')}</h2>
                <p className="s_p">{t('emailSection.description')}</p>
              </div>
            </div>

            <div className="a5_b fl" data-bis-skin-checked="1">
              <form onSubmit={handleSubmit} className="a5_f" id="fromContact" autoComplete="off" noValidate>

                <div className="form-group" data-bis-skin-checked="1">
                  <span className="form-label">{t('form.fullName')} <span>*</span></span>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder={t('form.fullName')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group" data-bis-skin-checked="1">
                  <span className="form-label">{t('form.emailAddress')} <span>*</span></span>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder={t('form.emailAddress')}
                    maxLength={320}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group" data-bis-skin-checked="1">
                  <span className="form-label">{t('form.title')} <span>*</span></span>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="title"
                    placeholder={t('form.title')}
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group" data-bis-skin-checked="1">
                  <span className="form-label">{t('form.content')} <span>*</span></span>
                  <textarea
                    name="content"
                    cols={40}
                    rows={6}
                    className="form-control"
                    id="content"
                    placeholder={t('form.contentPlaceholder')}
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="a5_fu btn btn-1" id="btnContact" disabled={loading}>
                  {loading ? 'Sending...' : t('form.send')}
                </button>
              </form>

              {status.message && (
                <div className={`status-message ${status.type === 'success' ? 'success' : 'error'}`}>
                  {status.message}
                </div>
              )}

              <div className="a5_d" data-bis-skin-checked="1">
                <div className="a5_k" data-bis-skin-checked="1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.062696923025!2d105.85045640000001!3d21.0301772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab57699de963%3A0x77e981398c403d!2sOrient%20Spa%20%26%20Nails!5e0!3m2!1svi!2s!4v1749461689518!5m2!1svi!2s"
                    width="355"
                    height="355"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="a5_e" data-bis-skin-checked="1">
                  <h3 className="a5_et">{t('locations.main.title')}</h3>
                  <ul className="a5_en">
                    <li><i className="fa fa-envelope-o"></i> {t('locations.main.email')}: orientspahanoi@gmail.com</li>
                    <li><i className="fa fa-phone"></i> {t('locations.main.address1')} - {t('locations.main.phone1')}</li>
                    <li><i className="fa fa-phone"></i> {t('locations.main.address2')} - {t('locations.main.phone2')}</li>
                    <li><i className="fa fa-phone"></i> {t('locations.main.address3')} - {t('locations.main.phone3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="s sH s3">
        <div className="container" data-bis-skin-checked="1">
          <div className="s2_f cs" data-bis-skin-checked="1">
            <Image
              src="/static/images/spa-map.jpg"
              alt={t('map.alt')}
              width={1200}
              height={600}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </div>
      </section>

      <div className="s sH a6 ct" data-bis-skin-checked="1">
        <div className="container" data-bis-skin-checked="1">
          <div className="a5_m" data-bis-skin-checked="1">
            <div className="a5_h text-center" data-bis-skin-checked="1">
              <div className="a5_a" data-bis-skin-checked="1">
                <i className="fa fa-phone"></i>
              </div>
              <div className="a5_c" data-bis-skin-checked="1">
                <h2 className="s_t2">{t('phoneSection.title')}</h2>
                <p className="s_p">{t('phoneSection.description')}</p>
              </div>
            </div>

            <div className="a6_b fl" data-bis-skin-checked="1">
              {/* Orient Spa & Nails */}
              <div className="a6_i" data-bis-skin-checked="1">
                <div className="a6_a" data-bis-skin-checked="1">
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/Orient-spa-nails-qr-1_3PWsllg.jpg" alt="Orient Spa & Nails" width={150} height={150} />
                  </div>
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/Orient-spa-nails-qr-2.jpg" alt="Orient Spa & Nails" width={150} height={150} />
                  </div>
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/Orient-spa-nails-qr-3_uVW9TRR.jpg" alt="Orient Spa & Nails" width={150} height={150} />
                  </div>
                </div>
                <div className="a6_c" data-bis-skin-checked="1">
                  <div data-bis-skin-checked="1">
                    <strong>{t('locations.main.title')}:</strong>
                    <br />
                    {t('locations.main.address1')}
                  </div>
                  <div className="a6_p" data-bis-skin-checked="1">
                    <i className="fa fa-phone"></i> {t('locations.main.phone1')}
                  </div>
                </div>
              </div>

              {/* Orient Spa (Cathedral Branch) */}
              <div className="a6_i" data-bis-skin-checked="1">
                <div className="a6_a" data-bis-skin-checked="1">
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/Orient-old-quarter-qr-3.jpg" alt="Orient Spa (Cathedral Branch)" width={150} height={150} />
                  </div>
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/Orient-old-quarter-qr-1.jpg" alt="Orient Spa (Cathedral Branch)" width={150} height={150} />
                  </div>
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/Orient-old-quarter-qr-2.jpg" alt="Orient Spa (Cathedral Branch)" width={150} height={150} />
                  </div>
                </div>
                <div className="a6_c" data-bis-skin-checked="1">
                  <div data-bis-skin-checked="1">
                    <strong>{t('locations.cathedral.title')}:</strong>
                    <br />
                    {t('locations.cathedral.address')}
                  </div>
                  <div className="a6_p" data-bis-skin-checked="1">
                    <i className="fa fa-phone"></i> {t('locations.cathedral.phone')}
                  </div>
                </div>
              </div>

              {/* La Flora Spa */}
              <div className="a6_i" data-bis-skin-checked="1">
                <div className="a6_a" data-bis-skin-checked="1">
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/La-Flora-qr-2.jpg" alt="La Flora Spa" width={150} height={150} />
                  </div>
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/La-Flora-qr-5.jpg" alt="La Flora Spa" width={150} height={150} />
                  </div>
                  <div className="a6_ai" data-bis-skin-checked="1">
                    <Image src="/media/spa/qr/2025/La-Flora-qr-3.jpg" alt="La Flora Spa" width={150} height={150} />
                  </div>
                </div>
                <div className="a6_c" data-bis-skin-checked="1">
                  <div data-bis-skin-checked="1">
                    <strong>{t('locations.laFlora.title')}:</strong>
                    <br />
                    {t('locations.laFlora.address')}
                  </div>
                  <div className="a6_p" data-bis-skin-checked="1">
                    <i className="fa fa-phone"></i> {t('locations.laFlora.phone')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactContent;
