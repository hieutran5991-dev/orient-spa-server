'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import type { NamespaceKeys } from 'use-intl'
import { SpaLocation } from '@/types/api'
import BookingForm from './BookingForm'

interface ReservationContentProps {
  spaLocations: SpaLocation[]
}

const ReservationContent = ({ spaLocations }: ReservationContentProps) => {
  const t = useTranslations('reservation' as NamespaceKeys<string, string>)

  return (
    <>
      <main className='main-content'>
        <div className='s a2 text-center'>
          <h1 className='a2_t'>{t('title')}</h1>
        </div>
        <div className='s a3 text-center'>
          <ul className='breadcrumb'>
            <li>
              <Link href='/'>{t('breadcrumb.home')}</Link>
            </li>
            <li>{t('breadcrumb.reservation')}</li>
          </ul>
        </div>
        <div className='s a6 res'>
          <div className='container'>
            <div className='a5_m'>
              <div className='a5_h text-center'>
                <div className='a5_c'>
                  <h2 className='s_t2'>{t('contactByPhone.title')}</h2>
                </div>
              </div>
              <div className='a6_b fl'>
                <div className='a6_i'>
                  <div className='a6_c'>
                    <div>
                      {t('contactByPhone.locations.orientSpa.name')}:{' '}
                      <span>{t('contactByPhone.locations.orientSpa.address')}</span>
                    </div>
                    <div className='a6_p'>
                      <i className='fa fa-phone'></i> {t('contactByPhone.locations.orientSpa.phone')}
                    </div>
                  </div>
                  <div className='a6_a'>
                    <div className='a6_ai'>
                      <Image
                        src='/images/reservations/line.png'
                        alt={t('contactByPhone.locations.orientSpa.name')}
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className='a6_ai'>
                      <Image
                        src='/images/reservations/kk.png'
                        alt={t('contactByPhone.locations.orientSpa.name')}
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className='a6_ai'>
                      <Image
                        src='/images/reservations/ws.png'
                        alt={t('contactByPhone.locations.orientSpa.name')}
                        width={120}
                        height={120}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='a6_f text-center'>
                <p>{t('welcomeMessage')}</p>
                <ul>
                  <li>{t('reservationMethods.phone')}</li>
                  <li>{t('reservationMethods.messaging')}</li>
                  <li>{t('reservationMethods.online')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='s sH a5 res'>
          <div className='container'>
            <div className='a5_m'>
              <div className='a5_h text-center'>
                <div className='a5_a'>
                  <i className='fa fa-calendar'></i>
                </div>
                <div className='a5_c'>
                  <h2 className='s_t2'>{t('onlineBooking.title')}</h2>
                  <p className='s_p'>{t('onlineBooking.description')}</p>
                  <ul>
                    <li>{t('onlineBooking.steps.location')}</li>
                    <li>{t('onlineBooking.steps.guests')}</li>
                    <li>{t('onlineBooking.steps.datetime')}</li>
                    <li>{t('onlineBooking.steps.services')}</li>
                  </ul>
                  <p className='s_p'>{t('onlineBooking.confirmation')}</p>
                </div>
              </div>
              <div className='a5_s text-center'>
                <span className='a5_sa btn btn-block btn-1 js-bk'>{t('onlineBooking.bookNow')}</span>
                <div className='a5_sw'>
                  <div className='a5_si'>
                    <h3>{t('about.reservation.title')}</h3>
                    <p>{t('about.reservation.content')}</p>
                  </div>
                  <div className='a5_si'>
                    <h3>{t('about.changes.title')}</h3>
                    <p>{t('about.changes.content')}</p>
                  </div>
                  <div className='a5_si'>
                    <h3>{t('about.payment.title')}</h3>
                    <p>{t('about.payment.content')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className='m8'>
        <BookingForm spaLocations={spaLocations}>
          <div className='s1_t hidden-lg hidden-md'>
            <strong>{t('title')}</strong>
            <i className='s1_z ic ic-close'></i>
          </div>
        </BookingForm>
      </div>
    </>
  )
}

export default ReservationContent
