'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import { spaServices } from '@/lib/mockData';
import Link from 'next/link';
import Image from 'next/image';
import type { NamespaceKeys } from "use-intl";

const PromotionsContent = () => {
  const t = useTranslations('promotions' as NamespaceKeys<string, string>);
  const tCommon = useTranslations('common' as NamespaceKeys<string, string>);
  const locale = useLocale() as Locale;

  const promotionServices = spaServices.filter(service => service.isPromotion);

  return (
    <>
      <div className="s a2 text-center" >
        <h1 className="a2_t">{t('title')}</h1>
      </div>

      <div className="s a3 text-center" >
        <ul className="breadcrumb">
          <li><Link href={`/${locale}`}>{tCommon('navigation.home')}</Link></li>
          <li className="active">{t('title')}</li>
        </ul>
      </div>

      <div className="s sH s1" >
        <div className="container">
          <div className="s_h">
            <h2 className="s_t">{t('specialTitle')}</h2>
            <p className="s_p">{t('specialSubtitle')}</p>
          </div>

          <div className="s1_m" >
            <div className="s1_mw" >
              <div className="s1_sw swiper js-sw1" >
                <div className="swiper-wrapper" >
                  {promotionServices.map((promotion) => (
                    <div key={promotion.id} className="swiper-slide" >
                      <div className="s1_i" >
                        <div className="k1_i" >
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

                        <div className="k1_b" >
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
