export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface EmailTemplate {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    adminEmailSent: boolean;
    clientEmailSent: boolean;
    adminHistoryId?: number;
    clientHistoryId?: number;
    timestamp: string;
  };
  error?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  historyId?: number;
  error?: string;
}