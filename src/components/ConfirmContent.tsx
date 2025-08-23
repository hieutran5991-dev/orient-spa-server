'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import type { Locale } from '@/utils/constants'
import { getSpaLocationBySlug } from '@/lib/mockData'
import type {NamespaceKeys} from "use-intl";
import {saveBooking} from "@/api/common";
import {BookingData} from "@/types/booking";
import {setSocketKeepAlive} from "@smithy/node-http-handler/dist-types/set-socket-keep-alive";

interface BookingFormData {
  spa?: string
  date?: string
  time?: string
  people?: string
  first_name?: string
  last_name?: string
  phone?: string
  email?: string
  content?: string
  guest_forms?: Array<{
    services: string[]
  }>
}

interface BookingStep {
  id: number
  icon: string
  title: string
  active: boolean
}

const ConfirmContent = () => {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)

  // Use namespace-based translations
  const t = useTranslations('confirm' as NamespaceKeys<any, any>)
  const tCommon = useTranslations('common' as NamespaceKeys<any, any>)

  useEffect(() => {
    const savedData = sessionStorage.getItem('final_booking_data')

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)

        setBookingData(parsedData)
      } catch (error) {
        router.push('/home')
      }
    } else {
      router.push('/home')
    }

    setIsLoading(false)
  }, [router])

  const handleConfirmBooking = async () => {
    setIsConfirming(true)

    try {
        const result = await saveBooking(bookingData)

        if (result) {
          sessionStorage.removeItem('final_booking_data')
          sessionStorage.removeItem('booking_form_data')

          router.push('/')
        }
    } catch (error: any) {
      sessionStorage.removeItem('final_booking_data')
      sessionStorage.removeItem('booking_form_data')
    } finally {
      setIsConfirming(false)
    }
  }

  if (isLoading) {
    return (
      <main className='main-content'>
        <div className='s k1'>
          <div className='container'>
            <div className='text-center'>Loading...</div>
          </div>
        </div>
      </main>
    )
  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND'
  }

  const totalPrice = 1000000;

  const bookingSteps: BookingStep[] = [
    { id: 1, icon: 'ic-reserve', title: t('steps.reserve'), active: true },
    { id: 2, icon: 'ic-select', title: t('steps.select'), active: true },
    { id: 3, icon: 'ic-confirm', title: t('steps.confirm'), active: true }
  ]

  return (
    <main className='main-content'>
      <div className='s k1'>
        <div className='k1_m fl fl-3'>
          {bookingSteps.map((step) => (
            <div key={step.id} className={`k1_i ${step.active ? 'active' : ''}`}>
              <div className='k1_a'>
                <i className={`ic ${step.icon}`}></i>
              </div>
              <div className='k1_c'>{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='s k2'>
        <div className='container'>
          <div className='k2_w fl'>
            <div className='k2_d'>
              <div className='k2_i'>
                <div className='k2_h hidden-sm hidden-xs'>{t('appointmentSummary.title')}</div>
                <div className='k2_b'>
                  <div className='k2_da hidden-sm hidden-xs'>
                  </div>
                  <div className='k2_dc active'>
                    <div className='k2_dt hidden-lg hidden-md'>{t('appointmentSummary.title')}</div>
                    <div className='k2_dm'>
                      <ul className='k2_dn'>
                        <li>
                          <strong>{t('appointmentSummary.date')}</strong> {bookingData.booking_date}
                        </li>
                        <li>
                          <strong>{t('appointmentSummary.time')}</strong> {bookingData.booking_time}
                        </li>
                        <li>
                          <strong>{t('appointmentSummary.location')}</strong>{' '}
                          {bookingData?.agency_name}
                        </li>
                        <li>
                          <strong>{t('appointmentSummary.guests')}</strong> {bookingData.people}
                        </li>
                      </ul>

                      {/* Service Details for Mobile/Tablet */}
                      <div className='k2_ds hidden-sm hidden-xs'>
                        {/*{bookingData.booking_details?.map((guest: any, index: number) => (*/}
                        {/*  <div key={index} className='k2_di'>*/}
                        {/*    <table>*/}
                        {/*      <tbody>*/}
                        {/*        <tr>*/}
                        {/*          <th colSpan={2}>*/}
                        {/*            {t('appointmentSummary.guest')} {index + 1}:*/}
                        {/*          </th>*/}
                        {/*        </tr>*/}
                        {/*        /!*{guest.services.map((service: string, serviceIndex: number) => (*!/*/}
                        {/*        /!*  <tr key={serviceIndex}>*!/*/}
                        {/*        /!*    <td>{service}</td>*!/*/}
                        {/*        /!*    <td>{formatPrice(620000)}</td>*!/*/}
                        {/*        /!*  </tr>*!/*/}
                        {/*        /!*))}*!/*/}
                        {/*      </tbody>*/}
                        {/*    </table>*/}
                        {/*  </div>*/}
                        {/*))}*/}

                        {totalPrice > 0 && (
                          <div className='k2_di'>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <strong>{t('serviceDetails.totalPrice')}</strong>
                                  </td>
                                  <td>
                                    <strong>{formatPrice(totalPrice)}</strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className='k2_m'>
              <div className='k2_mw'>
                {/* Service Details */}
                <div className='k2_i ot'>
                  <div className='k2_h'>{t('serviceDetails.title')}</div>
                  <div className='k2_b'>
                    <div className='k2_ds z16'>
                      {/*{bookingData.booking_details?.map((guest: any, index: number) => (*/}
                      {/*  <div key={index} className='k2_di'>*/}
                      {/*    <table>*/}
                      {/*      <tbody>*/}
                      {/*        <tr>*/}
                      {/*          <th colSpan={2}>*/}
                      {/*            {t('appointmentSummary.guest')} {index + 1}:*/}
                      {/*          </th>*/}
                      {/*        </tr>*/}
                      {/*        /!*{guest.services.map((service: string, serviceIndex: number) => (*!/*/}
                      {/*        /!*  <tr key={serviceIndex}>*!/*/}
                      {/*        /!*    <td>{service}</td>*!/*/}
                      {/*        /!*    <td>{formatPrice(620000)}</td>*!/*/}
                      {/*        /!*  </tr>*!/*/}
                      {/*        /!*))}*!/*/}
                      {/*      </tbody>*/}
                      {/*    </table>*/}
                      {/*  </div>*/}
                      {/*))}*/}

                      {totalPrice > 0 && (
                        <div className='k2_di'>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>{t('serviceDetails.totalPrice')}</strong>
                                </td>
                                <td>
                                  <strong>{formatPrice(totalPrice)}</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className='k2_i ot'>
                  <div className='k2_h'>{t('contactInfo.title')}</div>
                  <div className='k2_b'>
                    <div className='k2_ds z16'>
                      <div className='k2_di'>
                        <table>
                          <tbody>
                            <tr>
                              <td>{t('contactInfo.lastName')}</td>
                              <td>
                                <strong>{bookingData.last_name}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>{t('contactInfo.firstName')}</td>
                              <td>
                                <strong>{bookingData.first_name}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>{t('contactInfo.phone')}</td>
                              <td>
                                <strong>{bookingData.phone}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>{t('contactInfo.email')}</td>
                              <td>
                                <strong>{bookingData.email}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/*{spaLocation && (*/}
                {/*  <div className='k2_i ot'>*/}
                {/*    <div className='k2_h'>{t('spaLocation.title')}</div>*/}
                {/*    <div className='k2_b'>*/}
                {/*      <div className='k2_ds z16'>*/}
                {/*        <div className='k2_di'>*/}
                {/*          <table>*/}
                {/*            <tbody>*/}
                {/*              <tr>*/}
                {/*                <td>{t('spaLocation.spaName')}</td>*/}
                {/*                <td>*/}
                {/*                  <strong>{spaLocation.name[locale]}</strong>*/}
                {/*                </td>*/}
                {/*              </tr>*/}
                {/*              <tr>*/}
                {/*                <td>{t('spaLocation.location')}</td>*/}
                {/*                <td>*/}
                {/*                  <strong>{spaLocation.address[locale]}</strong>*/}
                {/*                </td>*/}
                {/*              </tr>*/}
                {/*              <tr>*/}
                {/*                <td>{t('spaLocation.contact')}</td>*/}
                {/*                <td>*/}
                {/*                  <strong>{spaLocation.phone}</strong>*/}
                {/*                </td>*/}
                {/*              </tr>*/}
                {/*            </tbody>*/}
                {/*          </table>*/}
                {/*        </div>*/}
                {/*      </div>*/}
                {/*      /!* Google Maps *!/*/}
                {/*      <div className='k2_q'>*/}
                {/*        <iframe*/}
                {/*          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0928037602653!2d105.84613287548966!3d21.028972380620434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab957915febd%3A0xc774f301415168bd!2sOrient%20Spa!5e0!3m2!1svi!2s!4v1749634302120!5m2!1svi!2s'*/}
                {/*          width='100%'*/}
                {/*          height='400'*/}
                {/*          style={{ border: 0 }}*/}
                {/*          allowFullScreen*/}
                {/*          loading='lazy'*/}
                {/*          referrerPolicy='no-referrer-when-downgrade'*/}
                {/*        ></iframe>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*)}*/}

                {/* Cancellation Policy */}
                <div className='k2_i ot'>
                  <div className='k2_h'>{t('cancellationPolicy.title')}</div>
                  <div className='k2_b'>
                    <p>
                      <strong>{t('cancellationPolicy.advance')}</strong>
                    </p>
                    <p>{t('cancellationPolicy.confirmation')}</p>
                    <p>{t('cancellationPolicy.urgent')}</p>
                    <p>{t('cancellationPolicy.arrive')}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='k2_f fl fl-2'>
                {/*<button onClick={() => router.push('/booking')} className='btn btn-2' disabled={isConfirming}>*/}
                {/*  <i className='fa fa-angle-left'></i>*/}
                {/*  {t('actions.changeService')}*/}
                {/*</button>*/}
                <button onClick={handleConfirmBooking} className='btn btn-1' disabled={isConfirming}>
                  {isConfirming ? 'Processing...' : t('actions.confirm')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ConfirmContent
