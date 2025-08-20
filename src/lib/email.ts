import nodemailer from 'nodemailer';
import type { ContactFormData, EmailTemplate, EmailResult } from '../types/contact';
import { insertEmailHistory, updateEmailHistoryStatus, EmailStatus } from './database';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: parseInt(process.env.SMTP_PORT as string),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
});

// Email templates
export const emailTemplates = {
  // Email to admin
  adminNotification: (formData: ContactFormData): EmailTemplate => ({
    from: process.env.SMTP_USER as string,
    to: process.env.ADMIN_EMAIL as string,
    subject: `New Contact Form Submission from ${formData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { background-color: white; padding: 10px; border-radius: 5px; border-left: 4px solid #dc2626; }
          .message-box { background-color: white; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
            </div>
            
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${formData.phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${formData.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>Submitted at:</strong> ${new Date().toLocaleString()}<br>
                <strong>Reply to:</strong> <a href="mailto:${formData.email}">${formData.email}</a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Contact Form Submission
      
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone || 'Not provided'}
      Subject: ${formData.subject}
      Message: ${formData.message}
      
      Submitted at: ${new Date().toLocaleString()}
    `
  }),

  // Thank you email to client
  clientConfirmation: (formData: ContactFormData): EmailTemplate => ({
    from: process.env.SMTP_USER as string,
    to: formData.email,
    subject: `Thank you for contacting ${process.env.COMPANY_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .message-summary { background-color: #f0f9f4; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Thank You!</h1>
          </div>
          <div class="content">
            <p>Hello <strong>${formData.name}</strong>,</p>
            
            <p>Thank you for contacting us! We have received your message and will get back to you within 24 hours.</p>
            
            <div class="message-summary">
              <h3>Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${formData.subject}</p>
              <p><strong>Message:</strong> ${formData.message}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p>If you need immediate assistance, please call us at <strong>(555) 123-4567</strong>.</p>
            
            <p>Best regards,<br>
            <strong>${process.env.COMPANY_NAME} Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${formData.name},
      
      Thank you for contacting us! We have received your message and will get back to you within 24 hours.
      
      Your message: "${formData.message}"
      Submitted: ${new Date().toLocaleString()}
      
      If you need immediate assistance, please call us at (555) 123-4567.
      
      Best regards,
      ${process.env.COMPANY_NAME} Team
    `
  })
};

// Send email function with database logging
export async function sendEmail(
  emailOptions: EmailTemplate, 
  receiverName?: string, 
  phoneNumber?: string
): Promise<EmailResult & { historyId?: number }> {
  let historyId: number | undefined;
  
  try {
    // Insert initial record with "not_sent" status
    historyId = await insertEmailHistory({
      receiver: emailOptions.to,
      receiver_name: receiverName,
      phone_number: phoneNumber,
      subject: emailOptions.subject,
      mail_content: emailOptions.html,
      status: EmailStatus.NOT_SENT
    });

    // Attempt to send email
    const info = await transporter.sendMail(emailOptions);
    
    // Update status to "sent" on success
    await updateEmailHistoryStatus(
      historyId, 
      EmailStatus.SENT, 
      undefined, 
      new Date()
    );
    
    console.log('Email sent successfully:', info.messageId);
    return { 
      success: true, 
      messageId: info.messageId, 
      historyId 
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Update status to "error" on failure
    if (historyId) {
      try {
        await updateEmailHistoryStatus(
          historyId, 
          EmailStatus.ERROR, 
          errorMessage
        );
      } catch (dbError) {
        console.error('Failed to update email history status:', dbError);
      }
    }
    
    return { 
      success: false, 
      error: errorMessage, 
      historyId 
    };
  }
}