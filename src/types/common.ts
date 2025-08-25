export interface Agency {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  open_time: string;
  close_time: string;
  capacity: number;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  description: string;
  duration: number;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  services: Product[];
}

