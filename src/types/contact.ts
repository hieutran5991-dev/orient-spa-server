export interface ContactFormData {
  full_name: string;
  email: string;
  title: string;
  content: string;
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

export interface ContactSubmissionData {
  full_name: string;
  email: string;
  title: string;
  content: string;
}