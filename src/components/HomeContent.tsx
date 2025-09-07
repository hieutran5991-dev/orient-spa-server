import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import type { NamespaceKeys } from 'use-intl'
import type { SpaLocation } from '@/types/api'
import BookingForm from './BookingForm'
import type { Locale } from '@/utils/constants'
import People from "@/components/home/People";
import Guests from "@/components/home/Guests";
import { CONFIG } from "@/utils/constants";

interface HomeContentProps {
  spaLocations: SpaLocation[]
}

const HomeContent = ({ spaLocations }: HomeContentProps) => {
  const locale = useLocale() as Locale
  const t = useTranslations('home' as NamespaceKeys<any, any>)
  const tCommon = useTranslations('common' as NamespaceKeys<any, any>)
  const tPromotions = useTranslations('promotions' as NamespaceKeys<any, any>)

  const heroBanners = [
    {
      id: 1,
      src: '/images/home-swiper/Swiper.jpg',
      alt: 'Orient Spa Banner'
    },
    {
      id: 2,
      src: '/images/home-swiper/Swiper-1.jpg',
      alt: 'Orient Spa Banner 2'
    },
    {
      id: 3,
      src: '/images/home-swiper/Swiper-2.jpg',
      alt: 'Orient Spa Banner 3'
    },
    {
      id: 4,
      src: '/images/home-swiper/Swiper-3.jpg',
      alt: 'Orient Spa Banner 4'
    },
    {
      id: 5,
      src: '/images/home-swiper/Swiper-4.jpg',
      alt: 'Orient Spa Banner 5'
    }
  ]

  const heroContent = {
    tagline: t('hero.tagline'),
    title: t('hero.title'),
    subtitle: t('hero.subtitle')
  }

  const aboutContent = {
    description: t('about.description')
  }

  const locationsSection = {
    title: t('locations.title'),
    subtitle: t('locations.subtitle'),
    locations:
      spaLocations && spaLocations?.length > 0
        ? spaLocations.map((location) => ({
          id: location.id,
          name: location.name,
          address: location.address,
          capacity: t('locations.maxCapacity', { count: location.capacity }),
          phone: location.phone,
          email: location.email,
          openTime: location.open_time,
          closeTime: location.close_time,
          href: `/spa/${location.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`,
          image: '/images/783d5b18e9483d703f24a6f8777c459f.jpg'
        }))
        : []
  }

  const promotionsSection = {
    title: t('promotions.title'),
    subtitle: t('promotions.subtitle'),
    promotions: [
      {
        id: 1,
        title: 'Body & Foot Massage - 105min',
        duration: t('promotions.duration', { minutes: 105 }),
        price: '620,000 VND',
        image: '/images/fcea460533a817d981e00a9b84e0eb65.jpg',
        href: '/promotions/body-foot-massage',
        features: [
          'Body Massage 75 minutes',
          'Foot massage/treatment 30 minutes',
          'Choice of Aroma, Thai, Deep Tissue or Hotstone Massage'
        ]
      }
    ]
  }

  const whyChooseUsSection = {
    title: t('whyChooseUs.title'),
    subtitle: t('whyChooseUs.subtitle'),
    features: [
      {
        id: 1,
        icon: 'ic ic-group',
        title: t('whyChooseUs.features.couples.title'),
        description: t('whyChooseUs.features.couples.description')
      },
      {
        id: 2,
        icon: 'ic ic-location',
        title: t('whyChooseUs.features.location.title'),
        description: t('whyChooseUs.features.location.description')
      },
      {
        id: 3,
        icon: 'ic ic-service',
        title: t('whyChooseUs.features.service.title'),
        description: t('whyChooseUs.features.service.description')
      }
    ]
  }

  return (
    <>
      <div className='s a1'>
        <div className='a1_s'>
          <div className='a1_sw swiper js-a1 swiper-fade'>
            <div className='swiper-wrapper'>
              {heroBanners.map((banner) => (
                <div key={banner.id} className='swiper-slide'>
                  <div className='a1_i'>
                    <Image src={banner.src} alt={banner.alt} width={1200} height={600} priority={banner.id === 1} />
                  </div>
                </div>
              ))}
            </div>
            <div className='a1_sn swiper-pagination'></div>
          </div>
        </div>
        <div className='a1_l text-center'>{heroContent.tagline}</div>
        <div className='a1_c text-center'>
          <h1 className='a1_ct'>{heroContent.title}</h1>
          <p className='a1_cp'>{heroContent.subtitle}</p>
        </div>

        <div className='s1'>
          <BookingForm spaLocations={spaLocations}>
            <div className='s1_t hidden-lg hidden-md'>
              <strong>{t('title')}</strong>
              <i className='s1_z ic ic-close'></i>
            </div>
          </BookingForm>
        </div>
        <span className='a1_a btn hidden-lg hidden-md'>{t('bookNow')}</span>
      </div>

      <div className='s sH s2'>
        <div className='container'>
          <div className='s2_o text-center'>
            <p>
              {aboutContent.description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < aboutContent.description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
          <div className='text-center hidden-lg hidden-md'>
            <span className='s2_v'>{tCommon('common.viewAll')}</span>
          </div>
        </div>
      </div>

      <div className='s sH s4'>
        <div className='container'>
          <div className='s_h'>
            <h2 className='s_t'>{promotionsSection.title}</h2>
            <p className='s_p'>{promotionsSection.subtitle}</p>
          </div>
          <div className='s4_m'>
            <div className='s4_mw'>
              <div className='s4_sw swiper js-sw4'>
                <div className='swiper-wrapper'>
                  {promotionsSection.promotions.map((promotion) => (
                    <div key={promotion.id} className='swiper-slide'>
                      <div className='s4_i'>
                        <div className='s4_a'>
                          <Image src={promotion.image} alt={promotion.title} width={300} height={200} />
                          <div className='s4_ac fl fl-3'>
                            <span className='s4_ad'>{promotion.duration}</span>
                            <span className='s4_an'>{promotion.price}</span>
                          </div>
                        </div>
                        <div className='s2_b'>
                          <h3 className='s2_t'>
                            <Link href={promotion.href}>{promotion.title}</Link>
                          </h3>
                          <ul className='s2_c'>
                            {promotion.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                          <Link href={promotion.href} className='s2_y'>
                            {tPromotions('readMore')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='s6_f fl fl-2'>
              <Link href='/services-prices' className='btn btn-2 s6_fa'>
                {tPromotions('viewSpaMenu')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <People />

      <Guests />

      {/* Why Choose Us Section */}
      <div className='s sH s7'>
        <div className='container'>
          <div className='s_h'>
            <h2 className='s_t'>{whyChooseUsSection.title}</h2>
            <p className='s_p'>{whyChooseUsSection.subtitle}</p>
          </div>
          <div className='s7_m'>
            <div className='s_g x3'>
              {whyChooseUsSection.features.map((feature) => (
                <div key={feature.id} className='s_gc'>
                  <div className='s7_i'>
                    <div className='s7_a'>
                      <i className={feature.icon}></i>
                    </div>
                    <div className='s7_c'>
                      <h3 className='s7_t' dangerouslySetInnerHTML={{ __html: feature.title }}></h3>
                      <p className='s7_p'>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeContent
