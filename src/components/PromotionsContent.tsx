'use client';

import { useTranslations, useLocale } from 'next-intl';
import { promotionPackages, type SpaService } from '@/lib/mockData';
import Link from 'next/link';
import Image from 'next/image';

const PromotionsContent = () => {
  const locale = useLocale() as 'en' | 'vi' | 'ja';
  const t = useTranslations();

  return (
    <>
      <div className="s a2 text-center" data-bis-skin-checked="1">
        <h1 className="a2_t">{t('promotions.title')}</h1>
      </div>
      
      <div className="s a3 text-center" data-bis-skin-checked="1">
        <ul className="breadcrumb">
          <li><Link href={`/${locale}`}>{t('navigation.home')}</Link></li>
          <li>{t('promotions.title')}</li>
        </ul>
      </div>

      <section className="s k1">
        <div className="container" data-bis-skin-checked="1">
          <div className="s_h" data-bis-skin-checked="1">
            <h2 className="s_t2">{t('promotions.pageTitle')}</h2>
          </div>

          <div className="k1_m" data-bis-skin-checked="1">
            <div className="s_g x3" data-bis-skin-checked="1">
              {promotionPackages.map((promotion: SpaService) => (
                <div key={promotion.id} className="s_gc" data-bis-skin-checked="1">
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
                        style={{ objectFit: 'cover' }}
                      />
                    </Link>
                    
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
                        {t('promotions.readMore')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="k1_e fl fl-2" data-bis-skin-checked="1">
            <ul className="pagination">
              {/* Pagination will be added here if needed */}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PromotionsContent;
