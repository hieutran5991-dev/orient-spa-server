export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

export interface ApiError {
  status: number
  message: string
  vietnameseMessage: string
  errors?: Record<string, string[]>
}

export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  errors?: Record<string, string[]>
): ApiResponse<T> => ({
  success,
  data,
  message,
  errors
})

export const handleApiError = (error: any): ApiError => {
  const status = error.response?.status || 500
  const message = error.response?.data?.message || error.message
  const vietnameseMessage = error.vietnameseMessage || 'Đã xảy ra lỗi'
  const errors = error.response?.data?.errors

  return {
    status,
    message,
    vietnameseMessage,
    errors
  }
}

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

// Vietnamese error messages for forms
export const FORM_ERROR_MESSAGES = {
  required: 'Trường này là bắt buộc',
  email: 'Email không hợp lệ',
  phone: 'Số điện thoại không hợp lệ',
  minLength: (min: number) => `Tối thiểu ${min} ký tự`,
  maxLength: (max: number) => `Tối đa ${max} ký tự`,
  pattern: 'Định dạng không hợp lệ',
  passwordMismatch: 'Mật khẩu không khớp',
  weakPassword: 'Mật khẩu quá yếu',
  invalidDate: 'Ngày không hợp lệ',
  invalidTime: 'Thời gian không hợp lệ',
  pastDate: 'Không thể chọn ngày trong quá khứ',
  futureDate: 'Không thể chọn ngày quá xa trong tương lai'
} as const

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]

export interface BookingData {
    spa: string
    date: string
    time: string
    people: string
    first_name: string
    last_name: string
    phone: string
    email: string
    content?: string
    guest_forms: Array<{
        services: string[]
    }>
}


export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
}

export interface SpaLocationApi {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  open_time: string;
  close_time: string;
  capacity: number;
}
