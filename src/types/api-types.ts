export interface ApiResponse<T> {
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


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
}
