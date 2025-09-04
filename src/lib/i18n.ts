import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { SUPPORTED_LANGUAGE, DEFAULT_LANGUAGE } from '@/utils/constants'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(SUPPORTED_LANGUAGE, requested) ? requested : DEFAULT_LANGUAGE

  const [
    commonMessages,
    homeMessages,
    bookingMessages,
    servicesMessages,
    promotionsMessages,
    contactMessages,
    confirmMessages,
    reservationMessages,
    guestsMessages,
    galleryMessages,
    thankMessages
  ] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/booking.json`).then((m) => m.default),
    import(`../locales/${locale}/services.json`).then((m) => m.default),
    import(`../locales/${locale}/promotions.json`).then((m) => m.default),
    import(`../locales/${locale}/contact.json`).then((m) => m.default),
    import(`../locales/${locale}/confirm.json`).then((m) => m.default),
    import(`../locales/${locale}/reservation.json`).then((m) => m.default),
    import(`../locales/${locale}/guests.json`).then((m) => m.default),
    import(`../locales/${locale}/gallery.json`).then((m) => m.default),
    import(`../locales/${locale}/thanks.json`).then((m) => m.default)
  ])

  // Merge all messages into one object with namespaces
  const messages = {
    common: commonMessages,
    home: homeMessages,
    booking: bookingMessages,
    services: servicesMessages,
    promotions: promotionsMessages,
    contact: contactMessages,
    confirm: confirmMessages,
    reservation: reservationMessages,
    guests: guestsMessages,
    gallery: galleryMessages,
    thanks: thankMessages
  }

  return {
    locale,
    messages
  }
})
