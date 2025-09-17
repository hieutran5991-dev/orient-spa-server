export const SUPPORTED_LANGUAGE = ['en', 'ja', 'ko'] as const
export const SUPPORTED_LOCALE_PATH = ['en', 'jp', 'kr'] as const
export const DEFAULT_LANGUAGE = 'en' as const
export const DEFAULT_LOCALE_PATH = 'en' as const
export type Locale = (typeof SUPPORTED_LANGUAGE)[number]
export type LocalePath = (typeof SUPPORTED_LOCALE_PATH)[number]

// Mapping từ path segment sang language code
export const MAP_LOCALE_PATH_TO_LANGUAGE = {
  en: 'en',
  jp: 'ja',
  kr: 'ko',
} as const

// Mapping từ language code sang path segment
export const MAP_LANGUAGE_TO_LOCALE_PATH = {
  en: 'en',
  ja: 'jp',
  ko: 'kr',
} as const

// Utility function để map locale sang path segment
export const getPathSegment = (locale: string): string => {
  return MAP_LANGUAGE_TO_LOCALE_PATH[locale as keyof typeof MAP_LANGUAGE_TO_LOCALE_PATH] || locale;
}

export const BOOKING_INIT_KEY = 'booking_form_data' as string;

export const BOOKING_CONFIRM_KEY = 'booking_confirm_data' as string;


export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505
} as const

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]

export const CONFIG = {
  SPA_NAME: 'SEN SPA DA NANG',
  SPA_LOCATION: '21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang',
  PHONE_WITH_COUNTRY_CODE: '+84 976 591 515',
  MAIL: 'senspa.dn@gmail.com',
  MAP_LOCATION: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30673.47556294559!2d108.1911715!3d16.0559157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ab5d9436d3%3A0x3a78e723f58964c7!2sSen%20Spa%20Danang!5e0!3m2!1svi!2s!4v1704420079487!5m2!1svi!2s'
} as const

export const ABOUT_US_IMAGES = [
  {
    id: 1,
    src: "/images/galleries/gallery-4.jpg",
    alt: "Spa Reception Area",
    title: "Welcome to Orient Spa & Nails",
  },
  {
    id: 2,
    src: "/images/galleries/gallery-2.jpg",
    alt: "Relaxation Lounge",
    title: "Comfortable Relaxation Space",
  },
  {
    id: 3,
    src: "/images/galleries/gallery-3.jpg",
    alt: "Treatment Room",
    title: "Professional Treatment Rooms",
  },
  {
    id: 4,
    src: "/images/galleries/gallery-1.jpg",
    alt: "Spa Entrance",
    title: "Modern Spa Facilities",
  },
  {
    id: 5,
    src: "/images/galleries/gallery-5.jpg",
    alt: "Spa Entrance",
    title: "Modern Spa Facilities",
  },
];

export const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000';

export const CURRENCY = {
  VND: 'VND',
  USD: 'USD'
} as const

export const MAIN_HOST = 'senspadanang.com' as const;
