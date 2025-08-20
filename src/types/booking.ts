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
