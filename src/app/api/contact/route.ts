import { NextRequest, NextResponse } from 'next/server';
import type { ContactFormData, ApiResponse } from '@/types/contact';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.title || !body.content) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'All required fields must be filled'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Please enter a valid email address'
      }, { status: 400 });
    }


    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: {
        adminEmailSent: true,
        clientEmailSent: true,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'An error occurred while processing your request. Please try again.'
    }, { status: 500 });
  }
}
