'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import { spaServices } from '@/lib/mockData';
import Link from 'next/link';
import Image from 'next/image';

const PromotionsContent = () => {
  const t = useTranslations('promotions');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;

  // Filter promotion services
  const promotionServices = spaServices.filter(service => service.isPromotion);

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

      <div className="s sH s1" data-bis-skin-checked="1">
        <div className="container">
          <div className="s_h">
            <h2 className="s_t">{t('specialTitle')}</h2>
            <p className="s_p">{t('specialSubtitle')}</p>
          </div>

          <div className="s1_m" data-bis-skin-checked="1">
            <div className="s1_mw" data-bis-skin-checked="1">
              <div className="s1_sw swiper js-sw1" data-bis-skin-checked="1">
                <div className="swiper-wrapper" data-bis-skin-checked="1">
                  {promotionServices.map((promotion) => (
                    <div key={promotion.id} className="swiper-slide" data-bis-skin-checked="1">
                      <div className="s1_i" data-bis-skin-checked="1">
                        <div className="k1_i" data-bis-skin-checked="1">
                          <Link
                            href={`/${locale}/promotions/${promotion.slug}`}
                            className="k1_a"
                            style={{ backgroundImage: `url(${promotion.image})` }}
                          >
                            <Image
                              src={promotion.image || '/images/default-promotion.jpg'}
                              alt={promotion.name[locale]}
                              width={400}
                              height={300}
                              className="k1_img"
                            />
                          </Link>
                        </div>

                        <div className="k1_b" data-bis-skin-checked="1">
                          <h2 className="k1_t">
                            <Link href={`/${locale}/promotions/${promotion.slug}`}>
                              {promotion.name[locale]}
                            </Link>
                          </h2>

                          <ul className="s2_c">
                            {promotion.benefits[locale].map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>

                          <Link href={`/${locale}/promotions/${promotion.slug}`} className="k1_v">
                            {t('readMore')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionsContent;
