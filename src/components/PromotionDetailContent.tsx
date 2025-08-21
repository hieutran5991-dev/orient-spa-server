'use client';

import { useTranslations, useLocale } from 'next-intl';
import { getPromotionBySlug, promotionPackages, type SpaService } from '@/lib/mockData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PromotionDetailContentProps {
  slug: string;
}

const PromotionDetailContent = ({ slug }: PromotionDetailContentProps) => {
  const locale = useLocale() as 'en' | 'vi' | 'ja';
  const t = useTranslations();

  const promotion = getPromotionBySlug(slug);

  if (!promotion) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Get other promotions for the "Other promotions" section
  const otherPromotions = promotionPackages.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="s a2 text-center" data-bis-skin-checked="1">
        <h1 className="a2_t">{t('promotions.title')}</h1>
      </div>
      
      <div className="s a3 text-center" data-bis-skin-checked="1">
        <ul className="breadcrumb">
          <li><Link href={`/${locale}`}>{t('navigation.home')}</Link></li>
          <li><Link href={`/${locale}/promotions`}>{t('promotions.title')}</Link></li>
          <li>{promotion.name[locale]}</li>
        </ul>
      </div>

      <div className="s k2" data-bis-skin-checked="1">
        <div className="container" data-bis-skin-checked="1">
          <div className="k2_w" data-bis-skin-checked="1">
            <div className="s_h text-center" data-bis-skin-checked="1">
              <h1 className="s_t3">{promotion.name[locale]}</h1>
            </div>
            
            <div className="k2_p" data-bis-skin-checked="1">
              <Image 
                src={promotion.image || '/images/default-promotion.jpg'} 
                alt={promotion.name[locale]}
                width={800}
                height={500}
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            <div className="k2_c" data-bis-skin-checked="1">
              <div className="k2_cm content" data-bis-skin-checked="1">
                <p>{promotion.description[locale]}</p>
                
                <p><strong>{t('promotions.whatsIncluded')}:</strong></p>
                <ul>
                  {promotion.benefits[locale].map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                
                <p><strong>{t('services.duration')}</strong>: {promotion.duration}'</p>
                <p><strong>{t('services.price')}</strong>: {formatPrice(promotion.price)}</p>
                <p><strong>{t('promotions.howToBook')}</strong>: Send us a <Link href={`/${locale}/contact`}>{t('promotions.sendMessage')}</Link> or make an <Link href={`/${locale}/booking?service=${promotion.slug}`}>{t('promotions.onlineReservation')}</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Other Promotions Section */}
      {otherPromotions.length > 0 && (
        <div className="s k3" data-bis-skin-checked="1">
          <div className="container" data-bis-skin-checked="1">
            <div className="k3_w" data-bis-skin-checked="1">
              <div className="s_h text-center" data-bis-skin-checked="1">
                <h2 className="s_t2">{t('promotions.otherPromotions')}</h2>
              </div>
              <div className="k3_m" data-bis-skin-checked="1">
                <div className="s_g x3" data-bis-skin-checked="1">
                  {otherPromotions.map((otherPromotion: SpaService) => (
                    <div key={otherPromotion.id} className="s_gc" data-bis-skin-checked="1">
                      <div className="k1_i" data-bis-skin-checked="1">
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
                            style={{ objectFit: 'cover' }}
                          />
                        </Link>
                        
                        <div className="k1_b" data-bis-skin-checked="1">
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
                            {t('promotions.readMore')}
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
      )}
    </>
  );
};

export default PromotionDetailContent;
