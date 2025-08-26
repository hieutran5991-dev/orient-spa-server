import request from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Category } from "@/types/common";
import { SpaLocation } from "@/types/api";
import { BookingSubmissionData, Product } from "@/types/booking";

export const getListSpa: () => Promise<AxiosResponse<SpaLocation[] | undefined>> = async () => {
  return await request.get('api/agencies');
};

export const getListCategories: () => Promise<AxiosResponse<Category[] | undefined>> = async () => {
  return await request.get('api/categories');
};

export const getListProducts: () => Promise<AxiosResponse<Product[] | []>> = async () => {
  return await request.get('api/products');
}

export const saveBooking = async (data: BookingSubmissionData) => {
  return await request.post('api/bookings', data);
}
