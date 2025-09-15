export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  duration: number; // in minutes
  prices: {
    VND: number;
    USD: number;
  };
  image_url?: string;
  is_featured: boolean;
  featured_product_description?: string;
  featured_product_detail?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  services: Product[];
}

