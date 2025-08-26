export interface GuestFormData {
    services: string[];
}

export interface BookingFormData {
    spa: string;
    date: string;
    time: string;
    people: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    content?: string;
    guest_1_services?: string[];
    guest_forms?: GuestFormData[];
    dials?: string;
    select?: boolean;
    total?: string;
}

export interface BookingApiResponse {
    success: boolean;
    message: string;
    data?: {
        bookingId?: string;
        redirectUrl?: string;
        timestamp: string;
    };
    error?: string;
}

export interface BookingData<T = Array<Product[]>> {
    agency_name?: string;
    agency_id?: string | number;
    booking_date?: string;
    booking_time?: string;
    people?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    note?: string;
    booking_details?: T;
    total_price?: number;
}

export type BookingSubmissionData = BookingData<Record<string, (string | number)[]>>;

export interface Product {
    id: number;
    name: string
    category_id: number;
    description: string
    duration: number;
    price: number;
}
