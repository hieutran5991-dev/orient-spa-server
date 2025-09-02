'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import { spaServices } from '@/lib/mockData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PromotionDetailContentProps {
  slug: string;
}

const PromotionDetailContent = ({ slug }: PromotionDetailContentProps) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('promotions');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services');

  const promotion = spaServices.find(p => p.slug === slug);

  if (!promotion) {
    notFound();
  }

  // Get other promotions for the "Other promotions" section
  const otherPromotions = spaServices.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="s a2 text-center" >
        <h1 className="a2_t">{t('title')}</h1>
      </div>

      <div className="s a3 text-center" >
        <ul className="breadcrumb">
          <li><Link href={`/${locale}`}>{tCommon('navigation.home')}</Link></li>
          <li><Link href={`/${locale}/promotions`}>{t('title')}</Link></li>
          <li className="active">{promotion.name[locale]}</li>
        </ul>
      </div>

      <div className="s sH s2" >
        <div className="container">
          <div className="s_h">
            <h1 className="s_t3">{promotion.name[locale]}</h1>
          </div>

          <div className="k2_p" >
            <Image
              src={promotion.image || '/images/default-promotion.jpg'}
              alt={promotion.name[locale]}
              width={800}
              height={600}
              className="k2_img"
            />
          </div>

          <div className="k2_c" >
            <div className="k2_cm content" >
              <p>{promotion.description[locale]}</p>

              <p><strong>{t('whatsIncluded')}:</strong></p>
              <ul>
                {promotion.benefits[locale].map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>

              <p><strong>{tServices('duration')}</strong>: {promotion.duration}&apos;</p>
              <p><strong>{tServices('price')}</strong>: {promotion.price} VND</p>

              <div className="k2_cta">
                <Link href={`/${locale}/booking`} className="btn btn-1 btn-block">
                  {t('bookThisPromotion')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Promotions Section */}
      {otherPromotions.length > 0 && (
        <div className="s sH s3" >
          <div className="container">
            <div className="s_h">
              <h2 className="s_t">{t('otherPromotions')}</h2>
            </div>

            <div className="k3_m" >
              <div className="s_g x3" >
                {otherPromotions.map((otherPromotion) => (
                  <div key={otherPromotion.id} className="s_gc" >
                    <div className="k1_i" >
                      <Link
                        href={`/${locale}/promotions/${otherPromotion.slug}`}
                        className="k1_a"
                        style={{ backgroundImage: `url(${otherPromotion.image})` }}
                      >
                        <Image
                          src={otherPromotion.image || '/images/default-promotion.jpg'}
                          alt={otherPromotion.name[locale]}
                          width={400}
                          height={300}
                          className="k1_img"
                        />
                      </Link>
                    </div>

                    <div className="k1_b" >
                      <h3 className="k1_t">
                        <Link href={`/${locale}/promotions/${otherPromotion.slug}`}>
                          {otherPromotion.name[locale]}
                        </Link>
                      </h3>

                      <ul className="s2_c">
                        {otherPromotion.benefits[locale].map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>

                      <Link href={`/${locale}/promotions/${otherPromotion.slug}`} className="k1_v">
                        {t('readMore')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionDetailContent;
