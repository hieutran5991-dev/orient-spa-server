// Locale Configuration
export const SUPPORTED_LANGUAGE = ['en', 'vi', 'ja'] as const
export const DEFAULT_LANGUAGE = 'en' as const
export type Locale = (typeof SUPPORTED_LANGUAGE)[number]

export const BOOKING_CONFIG = {
  maxGuests: 10,
  timeSlots: {
    morning: ['10:00', '10:30', '11:00', '11:30'],
    afternoon: [
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30'
    ]
  }
} as const

// Validation Rules
export const VALIDATION_RULES = {
  phone: {
    pattern: /^(\+84|84|0)[0-9]{9}$/,
    message: 'Please enter a valid Vietnamese phone number'
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  }
} as const
