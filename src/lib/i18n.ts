import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { SUPPORTED_LANGUAGE, DEFAULT_LANGUAGE, MAP_LOCALE_PATH_TO_LANGUAGE } from '@/utils/constants'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale

  const mappedLocale = MAP_LOCALE_PATH_TO_LANGUAGE[requested as keyof typeof MAP_LOCALE_PATH_TO_LANGUAGE] || requested
  const locale = hasLocale(SUPPORTED_LANGUAGE, mappedLocale) ? mappedLocale : DEFAULT_LANGUAGE

  const [
    commonMessages,
    homeMessages,
    bookingMessages,
    servicesMessages,
    featuredProductsMessages,
    contactMessages,
    confirmMessages,
    reservationMessages,
    guestsMessages,
    galleryMessages,
    thankMessages,
    blogsMessages
  ] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/booking.json`).then((m) => m.default),
    import(`../locales/${locale}/services.json`).then((m) => m.default),
    import(`../locales/${locale}/featuredProducts.json`).then((m) => m.default),
    import(`../locales/${locale}/contact.json`).then((m) => m.default),
    import(`../locales/${locale}/confirm.json`).then((m) => m.default),
    import(`../locales/${locale}/reservation.json`).then((m) => m.default),
    import(`../locales/${locale}/guests.json`).then((m) => m.default),
    import(`../locales/${locale}/gallery.json`).then((m) => m.default),
    import(`../locales/${locale}/thanks.json`).then((m) => m.default),
    import(`../locales/${locale}/blogs.json`).then((m) => m.default)
  ])

  // Merge all messages into one object with namespaces
  const messages = {
    common: commonMessages,
    home: homeMessages,
    booking: bookingMessages,
    services: servicesMessages,
    featuredProducts: featuredProductsMessages,
    contact: contactMessages,
    confirm: confirmMessages,
    reservation: reservationMessages,
    guests: guestsMessages,
    gallery: galleryMessages,
    thanks: thankMessages,
    blogs: blogsMessages
  }

  return {
    locale,
    messages
  }
})
