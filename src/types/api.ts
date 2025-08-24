export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface SpaLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  open_time: string;
  close_time: string;
  capacity: number;
}
