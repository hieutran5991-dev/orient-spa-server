import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import {getToken} from "@/utils/common";

export const HTTP_STATUS_MESSAGES = {
  200: 'Thành công',
  201: 'Tạo thành công',
  202: 'Đã chấp nhận',
  204: 'Không có nội dung',

  400: 'Yêu cầu không hợp lệ',
  401: 'Chưa đăng nhập',
  403: 'Không có quyền truy cập',
  404: 'Không tìm thấy',
  405: 'Phương thức không được phép',
  408: 'Hết thời gian yêu cầu',
  409: 'Xung đột dữ liệu',
  422: 'Dữ liệu không hợp lệ',
  429: 'Quá nhiều yêu cầu',

  500: 'Lỗi máy chủ nội bộ',
  501: 'Chưa được triển khai',
  502: 'Cổng xấu',
  503: 'Dịch vụ không khả dụng',
  504: 'Hết thời gian cổng',
  505: 'Phiên bản HTTP không được hỗ trợ'
} as const

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  timeout: Number(process.env.API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if(response?.data) {
        return response.data
    }
  },
  (error: AxiosError) => {
    const status = error.response?.status
    const vietnameseMessage = status
      ? HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES]
      : 'Lỗi không xác định'

    const enhancedError = {
      ...error,
      vietnameseMessage,
      originalMessage: error.message
    }

    return Promise.reject(enhancedError)
  }
)

export const getVietnameseErrorMessage = (error: any): string => {
  if (error.vietnameseMessage) {
    return error.vietnameseMessage
  }

  if (error.response?.status) {
    return HTTP_STATUS_MESSAGES[error.response.status as keyof typeof HTTP_STATUS_MESSAGES] || 'Lỗi không xác định'
  }

  return 'Lỗi kết nối mạng'
}

export default axiosInstance
