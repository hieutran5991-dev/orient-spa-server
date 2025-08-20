import { NextRequest, NextResponse } from 'next/server';
import type { BookingFormData, BookingApiResponse } from '@/types/booking';

export async function POST(request: NextRequest): Promise<NextResponse<BookingApiResponse>> {
  try {
    // Check if the request is form data or JSON
    const contentType = request.headers.get('content-type');
    let body: Partial<BookingFormData>;

    if (contentType?.includes('application/x-www-form-urlencoded')) {
      // Handle form data from HTML form submission
      const formData = await request.formData();
      body = {};

      formData.forEach((value, key) => {
        if (key === 'guest_1_services') {
          // Handle multiple checkbox values
          if (!body.guest_1_services) {
            body.guest_1_services = [];
          }
          body.guest_1_services.push(value.toString());
        } else {
          (body as any)[key] = value.toString();
        }
      });
    } else {
      // Handle JSON data
      body = await request.json();
    }

    // Check if this is initial booking check (from home page) or full booking submission
    const isInitialCheck = !body.first_name && !body.last_name && !body.email && !body.phone;

    if (isInitialCheck) {
      // Initial booking check - validate basic info and check availability
      if (!body.spa || !body.date || !body.time || !body.people) {
        return NextResponse.json(
          {
            success: false,
            message: 'Missing required booking information (spa, date, time, people)',
            error: 'Validation failed'
          },
          { status: 400 }
        );
      }

      // Mock time blocking check - in real implementation, this would check database
      const mockBookedTimes = [
        { date: '2025-08-27', time: '10:00', spa: '1' },
        { date: '2025-08-27', time: '14:00', spa: '2' },
        { date: '2025-08-27', time: '16:30', spa: '1' }
      ];

      const isTimeBlocked = mockBookedTimes.some(booking => 
        booking.date === body.date && 
        booking.time === body.time && 
        booking.spa === body.spa
      );

      if (isTimeBlocked) {
        return NextResponse.json(
          {
            success: false,
            message: 'Selected time is not available. Please choose another time.',
            error: 'Time blocked'
          },
          { status: 400 }
        );
      }

      // Time is available - proceed to booking page
      return NextResponse.json(
        {
          success: true,
          message: 'Time slot available! Redirecting to booking page...',
          data: {
            timestamp: new Date().toISOString()
          }
        },
        { status: 200 }
      );
    }

    // Full booking submission - validate all required fields
    if (!body.spa || !body.date || !body.time || !body.people) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required booking information (spa, date, time, people)',
          error: 'Validation failed'
        },
        { status: 400 }
      );
    }

    if (!body.first_name || !body.last_name || !body.email || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required contact information',
          error: 'Validation failed'
        },
        { status: 400 }
      );
    }

    // Create booking data object
    const bookingData: BookingFormData = {
      spa: body.spa!.trim(),
      date: body.date!.trim(),
      time: body.time!.trim(),
      people: body.people!.trim(),
      first_name: body.first_name!.trim(),
      last_name: body.last_name!.trim(),
      phone: body.phone!.trim(),
      email: body.email!.trim().toLowerCase(),
      content: body.content?.trim() || '',
      guest_1_services: body.guest_1_services || [],
      guest_forms: body.guest_forms || [],
      dials: body.dials?.trim() || '(+84)',
      select: body.select || false,
      total: body.total?.trim() || '0'
    };

    const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    const response = NextResponse.json(
      {
        success: true,
        message: 'Booking submitted successfully! Redirecting to confirmation page...',
        data: {
          bookingId,
          redirectUrl: '/confirm',
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );

    response.cookies.set('booking_data', JSON.stringify(bookingData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    response.cookies.set('booking_id', bookingId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Booking form error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while processing your booking. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}