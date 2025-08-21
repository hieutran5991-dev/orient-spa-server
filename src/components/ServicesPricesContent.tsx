'use client';

import { useTranslations, useLocale } from 'next-intl';
import { getSpaServicesByLocale, type SpaService } from '@/lib/mockData';
import Link from 'next/link';
import { useState } from 'react';

const ServicesPricesContent = () => {
  const locale = useLocale() as 'en' | 'vi' | 'ja';
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('tab-1');

  // Get services data
  const allServices = getSpaServicesByLocale(locale);
  const regularServices = allServices.filter(service => !service.isPromotion);
  
  // Group services by category
  const serviceCategories = [
    {
      id: 'tab-1',
      label: locale === 'vi' ? 'Massage Toàn Thân' : locale === 'ja' ? 'ボディマッサージ' : 'Body Massage',
      services: regularServices.filter(service => 
        service.category[locale].toLowerCase().includes('massage') || 
        service.category[locale].toLowerCase().includes('body') ||
        service.category[locale].toLowerCase().includes('toàn thân') ||
        service.category[locale].toLowerCase().includes('ボディ')
      )
    },
    {
      id: 'tab-2', 
      label: locale === 'vi' ? 'Liệu Pháp Thơm' : locale === 'ja' ? 'アロマセラピー' : 'Aromatherapy',
      services: regularServices.filter(service => 
        service.category[locale].toLowerCase().includes('aroma') ||
        service.category[locale].toLowerCase().includes('thơm') ||
        service.category[locale].toLowerCase().includes('アロマ')
      )
    },
    {
      id: 'tab-3',
      label: locale === 'vi' ? 'Massage Trị Liệu' : locale === 'ja' ? 'セラピューティックマッサージ' : 'Therapeutic Massage', 
      services: regularServices.filter(service => 
        service.category[locale].toLowerCase().includes('therapeutic') ||
        service.category[locale].toLowerCase().includes('trị liệu') ||
        service.category[locale].toLowerCase().includes('セラピューティック')
      )
    },
    {
      id: 'tab-4',
      label: locale === 'vi' ? 'Chăm Sóc Chân' : locale === 'ja' ? 'フットケア' : 'Foot Care',
      services: regularServices.filter(service => 
        service.category[locale].toLowerCase().includes('foot') ||
        service.category[locale].toLowerCase().includes('chân') ||
        service.category[locale].toLowerCase().includes('フット')
      )
    },
    {
      id: 'tab-5',
      label: locale === 'vi' ? 'Chăm Sóc Da Mặt' : locale === 'ja' ? 'フェイシャルケア' : 'Facial Care',
      services: regularServices.filter(service => 
        service.category[locale].toLowerCase().includes('facial') ||
        service.category[locale].toLowerCase().includes('da mặt') ||
        service.category[locale].toLowerCase().includes('フェイシャル')
      )
    }
  ].filter(category => category.services.length > 0);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <>
      <div className="s a2 text-center">
        <h1 className="a2_t">{t('services.title')}</h1>
      </div>

      <div className="s sH s8">
        <div className="container">
          <div className="a8_c text-center">
            <p>
              {t('services.subtitle')} <Link href={`/${locale}/promotions`}>{t('navigation.promotions')}</Link>. Gọi hotline <strong>0977 903 499</strong> để được tư vấn và đặt lịch hẹn.
            </p>
            <a
              href="/static/images/Orient-Spa-Menu-2024_2025.pdf"
              download
              className="btn btn-1 btn-block a5_sa"
            >
              Tải Menu PDF
            </a>
          </div>

          <div className="s8_m">
            <div className="s_h">
              <h1 className="s_t2">Menu Liệu Pháp</h1>
            </div>

            <div className="s8_b">
              <div className="s8_n">
                <ul className="tabs s8_nm">
                  {serviceCategories.map((category) => (
                    <li
                      key={category.id}
                      className={activeTab === category.id ? 'active' : ''}
                      data-tab={category.id}
                      onClick={() => handleTabClick(category.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>{category.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="s8_c">
                {serviceCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`tab-content ${activeTab === category.id ? 'active' : ''}`}
                    id={category.id}
                  >
                    {category.services.map((service: SpaService) => (
                      <div key={service.id} className="s8_i">
                        <div className="s8_c">
                          <h2 className="s8_l" id={`name${service.id}`}>
                            {service.name[locale]}
                          </h2>
                          {service.description && (
                            <div className="s8_p">
                              <p>
                                {service.description[locale].split('\n').map((line, index) => (
                                  <span key={index}>
                                    {line}
                                    {index < service.description[locale].split('\n').length - 1 && <br />}
                                  </span>
                                ))}
                              </p>
                            </div>
                          )}
                          <div className="s8_d">
                            <span>{service.duration} phút</span>
                            <strong>{formatPrice(service.price)}</strong>
                          </div>
                        </div>
                        <a
                          className="btn btn-2 s8_v js-bk"
                          href={`/${locale}/booking?service=${service.id}`}
                        >
                          {t('common.bookNow')}
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="s8_f">
              <div className="a8_c text-center">
                <p>
                  <strong>Lưu ý:</strong> Bạn có thể chọn nhiều liệu pháp trong một lần đến. Đối với nhóm từ 3 người trở lên, vui lòng <Link href={`/${locale}/contact`}>{t('navigation.contact')}</Link>. Chúng tôi mong được phục vụ bạn!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPricesContent;
