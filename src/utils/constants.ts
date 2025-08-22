// Locale Configuration
export const SUPPORTED_LANGUAGE = ['en', 'vi', 'ja'] as const;
export const DEFAULT_LANGUAGE = 'en' as const;
export type Locale = typeof SUPPORTED_LANGUAGE[number];

// App Configuration
export const APP_CONFIG = {
    name: 'Orient Spa Hanoi',
    description: 'A relaxing escape for all your senses, in the heart of Hanoi.',
    version: '1.0.0'
} as const;

// API Configuration
export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
    retryAttempts: 3
} as const;

// Booking Configuration
export const BOOKING_CONFIG = {
    maxGuests: 10,
    minAdvanceBooking: 24, // hours
    maxAdvanceBooking: 30, // days
    timeSlots: {
        morning: ['10:00', '10:30', '11:00', '11:30'],
        afternoon: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30']
    }
} as const;

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
} as const;

// File Upload Configuration
export const UPLOAD_CONFIG = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 5
} as const;
