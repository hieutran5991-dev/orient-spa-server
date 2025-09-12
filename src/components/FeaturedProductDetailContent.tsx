'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types/common';

interface FeaturedProductDetailContentProps {
  product: Product;
}

const FeaturedProductDetailContent = ({ product }: FeaturedProductDetailContentProps) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('featuredProducts');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services');

  if (!product) {
    notFound();
  }

  // Get other featured products for the "Other featured products" section
  // const otherFeaturedProducts = spaServices.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="title-container text-center" >
        <h1 className="title-text">{t('title')}</h1>
      </div>

      <div className="s a3 text-center" >
        <ul className="breadcrumb">
          <li><Link href={`/${locale}`}>{tCommon('navigation.home')}</Link></li>
          <li><Link href={`/${locale}/featured-products`}>{t('title')}</Link></li>
          <li className="active">{product.name}</li>
        </ul>
      </div>

      <div className="s sH s2" >
        <div className="container">
          <div className="s_h">
            <h1 className="s_t3">{product.name}</h1>
          </div>

          <div className="k2_p" >
            {/* <Image
              src={product.image || '/images/default-product.jpg'}
              alt={product.name}
              width={800}
              height={600}
              className="k2_img"
            /> */}
          </div>

          <div className="k2_c" >
            <div className="k2_cm content" >
              <p>{product.description}</p>

              <p><strong>{t('whatsIncluded')}:</strong></p>
              <ul>
                {/* {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))} */}
              </ul>

              <p><strong>{tServices('duration')}</strong>: {product.duration}&apos;</p>
              <p><strong>{tServices('price')}</strong>: {product.price} VND</p>

              <div className="k2_cta">
                <Link href={`/${locale}/booking`} className="btn btn-1 btn-block">
                  {t('bookThisFeaturedProduct')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Featured Products Section */}
      {/* {otherFeaturedProducts.length > 0 && (
        <div className="s sH s3" >
          <div className="container">
            <div className="s_h">
              <h2 className="s_t">{t('otherFeaturedProducts')}</h2>
            </div>

            <div className="k3_m" >
              <div className="s_g x3" >
                {otherFeaturedProducts.map((otherFeaturedProduct) => (
                  <div key={otherFeaturedProduct.id} className="s_gc" >
                    <div className="k1_i" >
                      <Link
                        href={`/${locale}/featured-products/${otherFeaturedProduct.slug}`}
                        className="k1_a"
                        style={{ backgroundImage: `url(${otherFeaturedProduct.image})` }}
                      >
                        <Image
                          src={otherFeaturedProduct.image || '/images/default-product.jpg'}
                          alt={otherFeaturedProduct.name}
                          width={400}
                          height={300}
                          className="k1_img"
                        />
                      </Link>
                    </div>

                    <div className="k1_b" >
                      <h3 className="k1_t">
                        <Link href={`/${locale}/featured-products/${otherFeaturedProduct.slug}`}>
                          {otherFeaturedProduct.name}
                        </Link>
                      </h3>

                      <ul className="s2_c">
                        {otherFeaturedProduct.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>

                      <Link href={`/${locale}/featured-products/${otherFeaturedProduct.slug}`} className="k1_v">
                        {t('readMore')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default FeaturedProductDetailContent;
