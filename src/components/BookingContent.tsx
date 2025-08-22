'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import { spaLocations, spaServices } from '@/lib/mockData';

interface BookingData {
    spa?: string;
    date?: string;
    time?: string;
    people?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
}

interface GuestFormData {
    services: string[];
}

const BookingContent = () => {
    const router = useRouter();
    const locale = useLocale() as Locale;
    const [bookingData, setBookingData] = useState<BookingData>({});
    const [guestForms, setGuestForms] = useState<GuestFormData[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Use namespace-based translations
    const t = useTranslations('booking');
    const tCommon = useTranslations('common');

    useEffect(() => {
        const savedData = sessionStorage.getItem('booking_form_data');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setBookingData(parsedData);

                // Generate guest forms based on number of people
                const numPeople = parseInt(parsedData.people || '1');
                const initialGuestForms: GuestFormData[] = Array.from({ length: numPeople }, (_, index) => ({
                    services: []
                }));
                setGuestForms(initialGuestForms);
            } catch (error) {
                console.error('Error parsing booking data:', error);
            }
        }
    }, []);

    const handleGuestFormChange = (guestIndex: number, services: string[]) => {
        const updatedForms = [...guestForms];
        updatedForms[guestIndex] = {
            services: services
        };
        setGuestForms(updatedForms);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // Prepare booking data
        const finalBookingData = {
            ...bookingData,
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            content: formData.get('content') as string,
            guest_forms: guestForms
        };

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalBookingData)
            });

            const result = await response.json();

            if (result.success) {
                // Save final booking data to session storage for confirmation page
                sessionStorage.setItem('final_booking_data', JSON.stringify(finalBookingData));
                sessionStorage.setItem('booking_id', result.data?.bookingId || '');

                // Redirect to confirmation page
                router.push('/confirm');
            } else {
                setError(result.message || 'Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };




    const bookingSteps = [
        { id: 1, icon: "ic-reserve", title: "Reserve", active: true },
        { id: 2, icon: "ic-select", title: "Select", active: true },
        { id: 3, icon: "ic-confirm", title: "Confirm!", active: false }
    ];

    const appointmentSummary = {
        date: bookingData.date || "27 August 2025",
        time: bookingData.time || "10:00",
        location: bookingData.spa || "Orient Spa & Nails",
        guests: bookingData.people || "1",
    };

    return (
        <main className="main-content">
            <div className="s k1">
                <div className="k1_m fl fl-3">
                    {bookingSteps.map((step) => (
                        <div key={step.id} className={`k1_i ${step.active ? 'active' : ''}`}>
                            <div className="k1_a">
                                <i className={`ic ${step.icon}`}></i>
                            </div>
                            <div className="k1_c">{step.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="s k2">
                <div className="container">
                    <div className="k2_w fl">
                        <div className="k2_d">
                            <div className="k2_i">
                                <div className="k2_h hidden-sm hidden-xs">Appointment summary</div>
                                <div className="k2_b">
                                    <div className="k2_da hidden-sm hidden-xs">
                                        <img src="/images/046489198c91d3feb14289b03064d86f.jpg" alt="Spa" />
                                    </div>
                                    <div className="k2_dc active">
                                        <div className="k2_dt hidden-lg hidden-md">Appointment summary</div>
                                        <div className="k2_dm">
                                            <ul className="k2_dn">
                                                <li><strong>Date:</strong> {appointmentSummary.date}</li>
                                                <li><strong>Time:</strong> {appointmentSummary.time}</li>
                                                <li><strong>Location:</strong> {appointmentSummary.location}</li>
                                                <li><strong>No. of Guests:</strong> {appointmentSummary.guests}</li>
                                            </ul>
                                            <div className="k2_ds"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <form action="/api/booking" className="k2_m" method="POST" id="fromBook" autoComplete="off" onSubmit={handleSubmit}>
                            <div className="k2_mw">
                                {guestForms.map((guestForm, guestIndex) => (
                                    <div key={guestIndex} className="k2_i">
                                        <div className="k2_h">Select treatment for Guest {guestIndex + 1}</div>
                                        <div className="k2_b">
                                            <div className="form-group has-feedback">
                                                <span className="form-label k2_l">
                                                    <i className="ic ic-user"></i>Guest {guestIndex + 1}
                                                </span>
                                                <span className="k2_mt">Treatment</span>
                                                <input
                                                    type="text"
                                                    className="form-control js-guest"
                                                    placeholder="Select your treatment"
                                                    defaultValue=""
                                                    readOnly
                                                />
                                                <span className="fc-feedback">
                                                    <i className="fa fa-angle-down"></i>
                                                </span>

                                                {/* Treatment Options */}
                                                <div className="k2_s">
                                                    <div className="k2_sh hidden-lg hidden-md">
                                                        <strong>Select treatment</strong>
                                                        <span className="k2_sx js-done">
                                                            <i className="ic ic-close"></i>
                                                        </span>
                                                    </div>
                                                    <div className="k2_sb">
                                                        {spaServices.map((service) => (
                                                            <div key={service.id} className="s8_i">
                                                                <div className="s8_c">
                                                                    <h3 className="s8_l">{service.name[locale]}</h3>
                                                                    <div className="s8_p">
                                                                        <p style={{ whiteSpace: 'pre-line' }}>{service.description[locale]}</p>
                                                                    </div>
                                                                    <div className="s8_d">
                                                                        <span>{service.duration} phút</span>
                                                                        <strong>{new Intl.NumberFormat('vi-VN', {
                                                                            style: 'currency',
                                                                            currency: 'VND'
                                                                        }).format(service.price)}</strong>
                                                                    </div>
                                                                </div>
                                                                <div className="s8_v">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`guest_${guestIndex + 1}_services`}
                                                                        value={service.id}
                                                                        id={`c_${guestIndex + 1}_${service.id}`}
                                                                    />
                                                                    <label htmlFor={`c_${guestIndex + 1}_${service.id}`}></label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="k2_sf hidden-lg hidden-md">
                                                        <span className="btn btn-block btn-1 js-done">DONE</span>
                                                    </div>
                                                </div>

                                                {guestIndex === 0 && (
                                                    <div className="k2_mk">
                                                        <input type="checkbox" name="select" id="all" />
                                                        <label htmlFor="all">Apply this same treatment for all guests</label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="k2_i ot">
                                    <div className="k2_h">Contact info</div>
                                    <div className="k2_b">
                                        <div className="s_g x2">
                                            <div className="s_gc">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="last_name"
                                                        className="form-control k2_r"
                                                        required
                                                        id="id_last_name"
                                                        defaultValue={bookingData.last_name || ''}
                                                    />
                                                    <span className="k2_v">Last name</span>
                                                </div>
                                            </div>
                                            <div className="s_gc">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        className="form-control k2_r"
                                                        required
                                                        id="id_first_name"
                                                        defaultValue={bookingData.first_name || ''}
                                                    />
                                                    <span className="k2_v">First name</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="k2_p form-group">
                                            <div className="k2_pd has-feedback">
                                                <input
                                                    type="text"
                                                    defaultValue="(+84)"
                                                    className="form-control js-phone"
                                                    name="dials"
                                                    readOnly
                                                />
                                                <span className="fc-feedback">
                                                    <i className="fa fa-angle-down"></i>
                                                </span>
                                            </div>

                                            <div className="k2_ps">
                                                <div className="k2_sh hidden-lg hidden-md">
                                                    <strong>Country code</strong>
                                                    <span className="k2_sx k2_px"><i className="ic ic-close"></i></span>
                                                </div>
                                                <div className="k2_ph">
                                                    <strong>Selected</strong>
                                                    <div className="k2_pc">Vietnam<span>(+84)</span></div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" placeholder="Country or region" className="form-control" id="country_search" />
                                                </div>
                                                <div className="k2_pb" id="book_phone"></div>
                                            </div>

                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Phone number"
                                                id="id_phone"
                                                defaultValue={bookingData.phone || ''}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                maxLength={320}
                                                required
                                                id="id_email"
                                                defaultValue={bookingData.email || ''}
                                            />
                                            <span className="k2_v">Email</span>
                                        </div>

                                        <div className="form-group">
                                            <span className="form-label k2_l">Additional Request</span>
                                            <textarea
                                                name="content"
                                                cols={40}
                                                rows={5}
                                                className="form-control"
                                                placeholder="Feel free to let us know if you need assistance or have an additional request so we can help to accommodate you or personalize your spa experience."
                                                id="id_content"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="k2_i ot">
                                    <div className="k2_h">Cancellation policy</div>
                                    <div className="k2_b">
                                        <p><strong>Please cancel or reschedule at least 24 hours in advance of your reservation time.</strong></p>
                                        <p>Upon booking, we will send you a confirmation email to confirm whether we can arrange the service for you and in case fully booked, we will inform you the closest time available.</p>
                                        <p>If you need to make change or make urgent booking please contact out hotline: +84 977 903 499 or email orientspahanoi@gmail.com</p>
                                        <p>We suggest you to arrive at our spa 10 minutes in advance of the treatment time to relax before the treatment time.</p>
                                    </div>
                                </div>

                                <input type="hidden" defaultValue="0" id="total" name="total" />
                            </div>

                            {error && (
                                <div className="error-message" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                                    {error}
                                </div>
                            )}
                            <div className="k2_f fl fl-2">
                                <button
                                    type="submit"
                                    className="btn btn-1 btn-block k2_u"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Review Your Booking'} <i className="fa fa-angle-right"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BookingContent;
