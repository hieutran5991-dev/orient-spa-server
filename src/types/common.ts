export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  duration: number; // in minutes
  price: number;
  currency: string;
  is_promoted: boolean;
  promotion_description?: string;
  promotion_details?: string;
  image_url?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  services: Product[];
}

