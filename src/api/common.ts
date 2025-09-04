import request from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Category } from "@/types/common";
import { SpaLocation } from "@/types/api";
import { BookingSubmissionData, Product } from "@/types/booking";
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

export const getListProducts: () => Promise<
  AxiosResponse<Product[] | []>
> = async (params: Record<string, any> = {}) => {
  const lang = await getLocale();
  return await request.get("api/products", { params: { lang, ...params } });
};

export const saveBooking = async (data: BookingSubmissionData) => {
  return await request.post("api/bookings", data);
};
