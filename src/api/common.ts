import request from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Category, Product } from "@/types/common";
import { ContactSubmissionData } from "@/types/contact";
import { SpaLocation } from "@/types/api";
import { BookingSubmissionData } from "@/types/booking";
import { getLocale } from "next-intl/server";

export const getListSpa: () => Promise<
  AxiosResponse<SpaLocation[] | undefined>
> = async () => {
  return await request.get("api/agencies");
};

export const getListCategories: () => Promise<
  AxiosResponse<Category[] | undefined>
> = async () => {
  const lang = await getLocale();
  return await request.get("api/categories", { params: { lang } });
};

export const getListProducts: (params?: Record<any, any> | null) => Promise<AxiosResponse<Product[] | []>> = async (params = {}) => {
  const lang = await getLocale();
  return await request.get("api/products", { params: { lang, ...params } });
};

export const getProductDetail: (id: string) => Promise<AxiosResponse<Product | undefined>> = async (id) => {
  const lang = await getLocale();
  return await request.get(`api/products/${id}`, { params: { lang } });
};

export const saveBooking = async (data: BookingSubmissionData) => {
  return await request.post("api/bookings", data);
};

export const saveContact = async (data: ContactSubmissionData) => {
  return await request.post("api/contacts", data);
};
