import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import type { Locale } from '@/utils/constants'
import type { SpaLocation } from '@/types/api'
import type { NamespaceKeys } from 'use-intl'
import { CONFIG } from '@/utils/constants'
interface FooterProps {
  spaLocations: SpaLocation[]
}

const Footer = ({ spaLocations }: FooterProps) => {
  const tCommon = useTranslations('common' as NamespaceKeys<string, string>)
  const locale = useLocale() as Locale
  return (
    <footer className='f'>
      <div className='f_m'>
        <div className='container'>
          <div className='f_mw'>
            <div className='f_mi'>
              <div className='f_i'>
                <h4 className='f_t'>{tCommon('footer.locations')}</h4>
                <div className='f_c'>
                  {spaLocations.map((location) => (
                    <dl key={location.id}>
                      <dt>{location.name}</dt>
                      <dd>
                        Address: {location.address}
                        <a href='https://maps.app.goo.gl/HCLkqkxV6t1hNgfs9' target='_blank' rel='nofollow'>
                          {tCommon('footer.viewMap')}
                        </a>
                      </dd>
                      <dd>
                        <i className='fa fa-phone'></i> {location.phone}
                      </dd>
                    </dl>
                  ))}
                </div>
              </div>
            </div>
            <div className='f_mi'>
              <div className='f_i'>
                <h4 className='f_t'>{CONFIG.SPA_NAME}</h4>
                <div className='f_c'>
                  <ul className='f_n fl'>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/page/about-us`}>{tCommon('footer.navigation.aboutUs')}</Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/services-prices`}>{tCommon('footer.navigation.spaMenu')}</Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/promotions`}>{tCommon('footer.navigation.promotions')}</Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/contact`}>{tCommon('footer.navigation.contactUs')}</Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/booking`}>{tCommon('footer.navigation.bookOnline')}</Link>
                    </li>
                    <li className="tw:w-[50%]">
                      <Link href={`/${locale}/blog`}>{tCommon('footer.navigation.blogs')}</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='f_i'>
                <h4 className='f_t'>{tCommon('footer.openingHours')}</h4>
                <div className='f_c'>
                  <p className='f_o'>
                    {tCommon('footer.openDaily')} <strong>{tCommon('footer.hours')}</strong>
                    <br />
                    {tCommon('footer.advancedReservation')}
                  </p>
                </div>
              </div>
            </div>

            <div className='f_mi'>
              <div className='f_i'>
                <h4 className='f_t'>{tCommon('footer.followUs')}</h4>
                <div className='f_c'>
                  <div className='f_s fl'>
                    <span>
                      <a href='https://www.facebook.com/p/Sen-Spa-%C4%90%C3%A0-N%E1%BA%B5ng-61554952904145/' target='_blank' rel='nofollow'>
                        <i className='fa fa-facebook'></i>
                      </a>
                    </span>
                    <span>
                      <a
                        href='https://www.instagram.com/senspadanang21'
                        target='_blank'
                        rel='nofollow'
                      >
                        <i className='fa fa-instagram'></i>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='f_mi'>
              <div className='f_i'>
                <h4 className='f_t'>{tCommon('footer.paymentMethods')}</h4>
                <div className='f_c'>
                  <Image src='/fonts/payment-methods.svg' alt='Payment Methods' width={200} height={40} />
                </div>
              </div>
            </div>
          </div>
          <div className='sP'>
            <div className='sP_i' id='toTop' data-bis-skin-checked='1'>
              <span>
                <i className='fa fa-angle-up'></i>
              </span>
            </div>
            <a
              href='https://qr.kakao.com/talk/EicqtwXI6griqg1G99.rFTSkaJo-'
              rel='nofollow'
              target='_blank'
              className='sP_i'
            >
              <span>
                <i className='ic ic-talk'></i>
              </span>
            </a>
            <a href={`'https://wa.me/${CONFIG.PHONE_NUMBER}`} rel='nofollow' target='_blank' className='sP_i'>
              <span>
                <Image src='/fonts/whatsapp-icon.svg' alt='WhatsApp' width={24} height={24} />
              </span>
            </a>
            <a href={`https://zalo.me/${CONFIG.PHONE_NUMBER}`} rel='nofollow' target='_blank' className='sP_i'>
              <span>
                <Image src='/fonts/zalo-icon.svg' alt='Zalo' width={24} height={24} />
              </span>
            </a>
            <a href={`tel:${CONFIG.PHONE_NUMBER}`} className='sP_i' data-title={CONFIG.PHONE_NUMBER}>
              <span>
                <i className='ic ic-phone'></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className='f_e'>
        <div className='container'>
          <div>{tCommon('footer.copyright')}</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
