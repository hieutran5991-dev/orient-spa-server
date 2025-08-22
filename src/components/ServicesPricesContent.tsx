'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import { spaServices } from '@/lib/mockData';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const ServicesPricesContent = () => {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;
  const [activeTab, setActiveTab] = useState('tab-1');

  // Get services data
  const allServices = spaServices;
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
  ];

  return (
    <div className="s8">
      <div className="container">
        <div className="s_h">
          <h1 className="s_t">{t('title')}</h1>
          <p className="s_p">{t('subtitle')}</p>
        </div>

        {/* Service Categories Tabs */}
        <div className="s8_t">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              className={`s8_tb ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Service Content */}
        {serviceCategories.map((category) => (
          <div key={category.id} className={`s8_c ${activeTab === category.id ? 'active' : ''}`}>
            <div className="s8_i">
              {category.services.map((service) => (
                <div key={service.id} className="s8_i">
                  <div className="s8_c">
                    <div className="s8_a">
                      {service.image && (
                        <Image
                          src={service.image}
                          alt={service.name[locale]}
                          width={200}
                          height={150}
                        />
                      )}
                    </div>
                    <div className="s8_b">
                      <h3 className="s8_t">{service.name[locale]}</h3>
                      <p className="s8_p">{service.description[locale]}</p>
                      <div className="s8_d">
                        <span className="s8_dt">{t('duration')}: {service.duration} min</span>
                        <span className="s8_dp">{t('price')}: {service.price} VND</span>
                      </div>
                      <Link href={`/${locale}/booking`} className="btn btn-1">
                        {t('bookTreatment')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPricesContent;
