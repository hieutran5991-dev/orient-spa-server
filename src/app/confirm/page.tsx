'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FinalBookingData {
    spa: string;
    date: string;
    time: string;
    people: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    content?: string;
    guest_forms: Array<{
        services: string[];
    }>;
}

const ConfirmPage = () => {
    const router = useRouter();
    const [bookingData, setBookingData] = useState<FinalBookingData | null>(null);
    const [bookingId, setBookingId] = useState<string>('');

    useEffect(() => {
        const savedBookingData = sessionStorage.getItem('final_booking_data');
        const savedBookingId = sessionStorage.getItem('booking_id');

        if (savedBookingData && savedBookingId) {
            try {
                setBookingData(JSON.parse(savedBookingData));
                setBookingId(savedBookingId);
            } catch (error) {
                console.error('Error parsing booking data:', error);
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, [router]);

    if (!bookingData) {
        return (
            <div className="container" style={{ padding: '50px 20px', textAlign: 'center' }}>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <main className="main-content">
            <div className="s k1">
                <div className="container">
                    <div className="text-center">
                        <h1 className="s_t">Booking Confirmation</h1>
                        <p className="s_p">Your booking has been successfully submitted!</p>
                    </div>
                </div>
            </div>

            <div className="s k2">
                <div className="container">
                    <div className="k2_w fl">
                        <div className="k2_d">
                            <div className="k2_i">
                                <div className="k2_h">Booking Summary</div>
                                <div className="k2_b">
                                    <div className="k2_dc active">
                                        <div className="k2_dm">
                                            <ul className="k2_dn">
                                                <li><strong>Booking ID:</strong> {bookingId}</li>
                                                <li><strong>Date:</strong> {bookingData.date}</li>
                                                <li><strong>Time:</strong> {bookingData.time}</li>
                                                <li><strong>Location:</strong> {bookingData.spa}</li>
                                                <li><strong>Number of Guests:</strong> {bookingData.people}</li>
                                                <li><strong>Primary Contact:</strong> {bookingData.first_name} {bookingData.last_name}</li>
                                                <li><strong>Phone:</strong> {bookingData.phone}</li>
                                                <li><strong>Email:</strong> {bookingData.email}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="k2_m">
                            <div className="k2_mw">
                                <div className="k2_i">
                                    <div className="k2_h">Guest Details</div>
                                    <div className="k2_b">
                                        {bookingData.guest_forms.map((guest, index) => (
                                            <div key={index} className="guest-summary" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                                                <h4>Guest {index + 1}</h4>
                                                <p><strong>Services:</strong></p>
                                                <ul>
                                                    {guest.services.map((serviceId, serviceIndex) => {
                                                        // You can map service IDs to names here if needed
                                                        return <li key={serviceIndex}>Service ID: {serviceId}</li>;
                                                    })}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {bookingData.content && (
                                    <div className="k2_i ot">
                                        <div className="k2_h">Additional Requests</div>
                                        <div className="k2_b">
                                            <p>{bookingData.content}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="k2_i ot">
                                    <div className="k2_h">Next Steps</div>
                                    <div className="k2_b">
                                        <p>We will send you a confirmation email shortly. Please check your email for further instructions.</p>
                                        <p>If you need to make any changes to your booking, please contact us at:</p>
                                        <ul>
                                            <li>Phone: +84 977 903 499</li>
                                            <li>Email: orientspahanoi@gmail.com</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="k2_f fl fl-2">
                                <Link href="/" className="btn btn-1 btn-block k2_u">
                                    Back to Home <i className="fa fa-home"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ConfirmPage;
