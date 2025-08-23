import axiosInstance from './axios'
import {ApiError, ApiResponse, BookingData, handleApiError} from '@/types/api-types'


export interface BookingResponse {
  bookingId: string
  confirmationCode: string
  status: 'pending' | 'confirmed' | 'cancelled'
  totalAmount: number
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

// Booking API Service
export class BookingApiService {
  static async createBooking(data: BookingData): Promise<any> {
    try {
      const response = await axiosInstance.post<ApiResponse<BookingResponse>>('/booking', data)
      return response.data
    } catch (error) {
        throw handleApiError(error)
    }
  }

  // Get booking by ID
  static async getBooking(bookingId: string): Promise<ApiResponse<BookingData & BookingResponse>> {
    try {
      const response = await axiosInstance.get<ApiResponse<BookingData & BookingResponse>>(`/booking/${bookingId}`)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  // Update booking
  static async updateBooking(bookingId: string, data: Partial<BookingData>): Promise<ApiResponse<BookingResponse>> {
    try {
      const response = await axiosInstance.put<ApiResponse<BookingResponse>>(`/booking/${bookingId}`, data)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  // Cancel booking
  static async cancelBooking(bookingId: string, reason?: string): Promise<ApiResponse<{ cancelled: boolean }>> {
    try {
      const response = await axiosInstance.delete<ApiResponse<{ cancelled: boolean }>>(`/booking/${bookingId}`, {
        data: { reason }
      })
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  // Confirm booking
  static async confirmBooking(bookingId: string): Promise<ApiResponse<BookingResponse>> {
    try {
      const response = await axiosInstance.post<ApiResponse<BookingResponse>>(`/booking/${bookingId}/confirm`)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  // Get available time slots
  static async getAvailableSlots(date: string, spa: string): Promise<ApiResponse<string[]>> {
    try {
      const response = await axiosInstance.get<ApiResponse<string[]>>('/booking/available-slots', {
        params: { date, spa }
      })
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }
}

// Contact API Service
export class ContactApiService {
  // Send contact form
  static async sendContactForm(data: ContactFormData): Promise<ApiResponse<{ messageId: string }>> {
    try {
      const response = await axiosInstance.post<ApiResponse<{ messageId: string }>>('/contact', data)
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }
}

// Spa Services API
export class SpaApiService {
  // Get spa locations
  static async getSpaLocations(): Promise<ApiResponse<any[]>> {
    try {
      const response = await axiosInstance.get<ApiResponse<any[]>>('/spa/locations')
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  // Get spa services
  static async getSpaServices(): Promise<ApiResponse<any[]>> {
    try {
      const response = await axiosInstance.get<ApiResponse<any[]>>('/spa/services')
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  // Get promotions
  static async getPromotions(): Promise<ApiResponse<any[]>> {
    try {
      const response = await axiosInstance.get<ApiResponse<any[]>>('/spa/promotions')
      return response.data
    } catch (error) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }
}

// Generic API utilities
export const apiUtils = {
  // Handle form submission with loading state
  async handleFormSubmission<T>(
    apiCall: () => Promise<ApiResponse<T>>,
    onSuccess: (data: T) => void,
    onError: (error: ApiError) => void,
    setLoading?: (loading: boolean) => void
  ): Promise<void> {
    try {
      setLoading?.(true)
      const response = await apiCall()

      if (response.success && response.data) {
        onSuccess(response.data)
      } else {
        onError({
          status: 400,
          message: response.message || 'Đã xảy ra lỗi',
          vietnameseMessage: response.message || 'Đã xảy ra lỗi',
          errors: response.errors
        })
      }
    } catch (error) {
      onError(handleApiError(error))
    } finally {
      setLoading?.(false)
    }
  },

  // Get error message from API error
  getErrorMessage(error: ApiError): string {
    return error.vietnameseMessage || error.message || 'Đã xảy ra lỗi không xác định'
  },

  // Get field errors from API error
  getFieldErrors(error: ApiError): Record<string, string> {
    if (!error.errors) return {}

    const fieldErrors: Record<string, string> = {}
    Object.entries(error.errors).forEach(([field, messages]) => {
      fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages
    })

    return fieldErrors
  },

  // Check if error is validation error
  isValidationError(error: ApiError): boolean {
    return error.status === 422 && !!error.errors
  },

  // Check if error is authentication error
  isAuthError(error: ApiError): boolean {
    return error.status === 401
  },

  // Check if error is authorization error
  isAuthorizationError(error: ApiError): boolean {
    return error.status === 403
  },

  // Check if error is not found error
  isNotFoundError(error: ApiError): boolean {
    return error.status === 404
  },

  // Check if error is server error
  isServerError(error: ApiError): boolean {
    return error.status >= 500
  }
}
