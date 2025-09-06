export const SUPPORTED_LANGUAGE = ['en', 'vi', 'ja', 'ko'] as const
export const DEFAULT_LANGUAGE = 'en' as const
export type Locale = (typeof SUPPORTED_LANGUAGE)[number]

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
  PHONE_NUMBER: '0976591515',
  MAIL: 'senspa.dn@gmail.com',
  MAP_LOCATION: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30673.47556294559!2d108.1911715!3d16.0559157!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219ab5d9436d3%3A0x3a78e723f58964c7!2sSen%20Spa%20Danang!5e0!3m2!1svi!2s!4v1704420079487!5m2!1svi!2s'
} as const
