import { Product } from "./common";

export interface GuestFormData {
    services: string[];
}

export interface BookingData<T = Array<Product[]>> {
    agency_name?: string;
    agency_id?: string | number;
    booking_date?: string;
    booking_time?: string;
    people?: string;
    full_name?: string;
    phone?: string;
    social_account_id?: string;
    email?: string;
    note?: string;
    booking_details?: T;
    total_price?: {
        VND: number;
        USD: number
    };
}

export type BookingSubmissionData = BookingData<Record<string, (string | number)[]>>;
