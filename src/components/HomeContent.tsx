'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { spaLocations } from '@/lib/mockData';

const HomeContent = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // Get form data
        const spaInput = document.getElementById('f2') as HTMLInputElement;
        const spaId = spaInput.getAttribute('data-spa-id') || spaInput.value;

        const bookingData = {
            spa: spaId,
            date: formData.get('date'),
            time: formData.get('time'),
            people: formData.get('people')
        };

        try {
            // Call API to check availability and save booking
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

            if (result.success) {
                // Save form data to session storage
                sessionStorage.setItem('booking_form_data', JSON.stringify(bookingData));

                // Redirect to booking page
                router.push('/booking');
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
    const heroBanners = [
        {
            id: 1,
            src: "/images/Home-banner-update.jpg",
            alt: "Orient Spa Banner"
        },
        {
            id: 2,
            src: "/images/Home-banner-2.png",
            alt: "Orient Spa Banner 2"
        },
        {
            id: 3,
            src: "/images/Home-banner-3.png",
            alt: "Orient Spa Banner 3"
        }
    ];

    const heroContent = {
        tagline: "A relaxing escape for all your senses",
        title: "Welcome to orient spa",
        subtitle: "A relaxing escape for all your senses, in the heart of Hanoi."
    };

    const timeSlots = {
        availabilityDate: "Wed, 27 Aug 2025",
        periods: [
            {
                id: 1,
                period: "Morning",
                times: ["10:00", "10:30", "11:00", "11:30"]
            },
            {
                id: 2,
                period: "Afternoon",
                times: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"]
            },
            {
                id: 3,
                period: "Evening",
                times: ["19:00", "19:30", "20:00", "20:30"]
            }
        ]
    };

    const guestSelection = {
        maxGuests: 10,
        guests: Array.from({ length: 10 }, (_, i) => i + 1)
    };

    const aboutContent = {
        description: `Founded in 2017 with the aim to provide visitors and locals with a relaxing spa experience, 
Orient Spa Hanoi currently operates 3 spas all in the heart of Hanoi Old Quarter.
We offer foot and body massage, nails care and shampoo, as well as spa packages.
Our spa is open from 10:00am - 10:00pm daily. Advanced reservation is recommended especially during weekend.`
    };

    // Locations section data
    const locationsSection = {
        title: "OUR LOCATIONS",
        subtitle: "We currently offer services at the following locations",
        locations: [
            {
                id: 1,
                name: "Orient Spa & Nails",
                address: "No 18 Bao Khanh, Hoan Kiem, Hanoi",
                capacity: "18 guests",
                phone: "(+84) 866 903 499",
                href: "/spa/orient-spa-nails",
                image: "/images/2501a13248def0544df4943d3312fb4b.jpg"
            }
        ]
    };

    // Promotions section data
    const promotionsSection = {
        title: "August 2025 Special Promotions",
        subtitle: "Enjoy special promotions at Orient Spa and treat yourself to a refreshing break you deserve.",
        promotions: [
            {
                id: 1,
                title: "Body & Foot Massage - 105min",
                duration: "105 min",
                price: "620,000 VND",
                image: "/images/fcea460533a817d981e00a9b84e0eb65.jpg",
                href: "/promotions/body-foot-massage",
                features: [
                    "Body Massage 75 minutes",
                    "Foot massage/treatment 30 minutes",
                    "Choice of Aroma, Thai, Deep Tissue or Hotstone Massage"
                ]
            }
        ]
    };

    // Why choose us section data
    const whyChooseUsSection = {
        title: "Why Choose Orient spa Hanoi?",
        subtitle: "Visit Orient Spa Hanoi and take a heavenly break from your daily routine or pamper yourself nicely after a long trip.",
        features: [
            {
                id: 1,
                icon: "ic ic-group",
                title: "Perfect for couples, groups, and solo travelers",
                description: "Whether you're traveling alone, or on a honeymoon, or even with young kids, we always have something to offer."
            },
            {
                id: 2,
                icon: "ic ic-location",
                title: "Convenient and central location",
                description: "All our spas are just a short walk from major attractions of Hanoi such as Hoan Kiem Lake and Saint Joseph Cathedral."
            },
            {
                id: 3,
                icon: "ic ic-service",
                title: "Skilled therapists and attentive receptionists",
                description: "Be warmly welcomed and expertly cared for by friendly staff from start to finish."
            }
        ]
    };

    return (
        <>
            <div className="s a1">
                <div className="a1_s">
                    <div className="a1_sw swiper js-a1 swiper-fade">
                        <div className="swiper-wrapper">
                            {heroBanners.map((banner) => (
                                <div key={banner.id} className="swiper-slide">
                                    <div className="a1_i">
                                        <Image
                                            src={banner.src}
                                            alt={banner.alt}
                                            width={1200}
                                            height={600}
                                            priority={banner.id === 1}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="a1_sn swiper-pagination"></div>
                    </div>
                </div>
                <div className="a1_l text-center">{heroContent.tagline}</div>
                <div className="a1_c text-center">
                    <h1 className="a1_ct">{heroContent.title}</h1>
                    <p className="a1_cp">{heroContent.subtitle}</p>
                </div>

                <div className="s1">
                    <form action="/api/booking" method="post" id="formBookBox" className="s1_f" onSubmit={handleSubmit}>
                        <div className="s1_t hidden-lg hidden-md">
                            <strong>Online Booking</strong>
                            <i className="s1_z ic ic-close"></i>
                        </div>
                        <div className="row">
                            <div className="s1_g">
                                <div className="form-group has-feedback">
                                    <input
                                        type="text"
                                        id="f2"
                                        name="spa"
                                        className="form-control u1 js-v2"
                                        required
                                    />
                                    <label htmlFor="f2" className="s1_v">Location</label>
                                    <span className="fc-feedback">
                                        <i className="fa fa-angle-down"></i>
                                    </span>

                                    <div className="s1_s w2 s1_s2">
                                        <div className="s1_sh hidden-lg hidden-md">
                                            <div className="s1_st">Select location</div>
                                            <span className="s1_x js-done">
                                                <i className="ic ic-close"></i>
                                            </span>
                                        </div>
                                        <div className="s1_sd">
                                            <ul className="s1_d">
                                                {spaLocations.map((location) => (
                                                    <li key={location.id} data-value={location.id}>
                                                        <strong>{location.name}</strong>
                                                        <span>{location.address}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="s1_sf hidden-lg hidden-md">
                                            <span className="s1_su js-done btn btn-1 btn-block">Done</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="s1_g">
                                <div className="form-group has-feedback">
                                    <input
                                        type="text"
                                        id="date"
                                        name="date"
                                        className="form-control u1 js-v1"
                                        required
                                    />
                                    <label htmlFor="date" className="s1_v">Date</label>
                                    <span className="fc-feedback">
                                        <i className="fa fa-calendar"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="s1_g">
                                <div className="form-group has-feedback">
                                    <input
                                        type="text"
                                        id="f3"
                                        name="time"
                                        className="form-control u1 js-v3"
                                        required
                                    />
                                    <label htmlFor="f3" className="s1_v">Time</label>
                                    <span className="fc-feedback">
                                        <i className="fa fa-angle-down"></i>
                                    </span>

                                    <div className="s1_s w2 s1_s3">
                                        <div className="s1_sh hidden-lg hidden-md">
                                            <div className="s1_st">Select time</div>
                                            <span className="s1_x js-done"><i className="ic ic-close"></i></span>
                                        </div>
                                        <div className="s1_sd">
                                            <div className="s1_k" id="listTimes">
                                                <div className="s1_l">Availability for {timeSlots.availabilityDate}</div>

                                                {timeSlots.periods.map((period) => (
                                                    <dl key={period.id} className="s1_j">
                                                        <dt>{period.period}:</dt>
                                                        {period.times.map((time) => (
                                                            <dd key={time}>{time}</dd>
                                                        ))}
                                                    </dl>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="s1_sf hidden-lg hidden-md">
                                            <span className="s1_su js-done btn btn-1 btn-block">Done</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="s1_g">
                                <div className="form-group has-feedback">
                                    <input
                                        type="text"
                                        id="f4"
                                        name="people"
                                        className="form-control u1 js-v4"
                                        required
                                    />
                                    <label htmlFor="f4" className="s1_v">Guest</label>
                                    <span className="fc-feedback">
                                        <i className="fa fa-angle-down"></i>
                                    </span>

                                    <div className="s1_s s1_s4">
                                        <div className="s1_sh hidden-lg hidden-md">
                                            <div className="s1_st">Select guest</div>
                                            <span className="s1_x js-done"><i className="ic ic-close"></i></span>
                                        </div>
                                        <div className="s1_sd">
                                            <ul className="s1_n">
                                                {guestSelection.guests.map((guestNumber) => (
                                                    <li key={guestNumber}>{guestNumber}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="s1_sf hidden-lg hidden-md">
                                            <span className="s1_su js-done btn btn-1 btn-block">Done</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {error && (
                            <div className="error-message" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-block btn-1 s1_u booknow"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'BOOK NOW!'}
                        </button>
                    </form>
                </div>
                <span className="a1_a btn hidden-lg hidden-md">BOOK NOW!</span>
            </div>

            <div className="s sH s2">
                <div className="container">
                    <div className="s2_o text-center">
                        <p>
                            {aboutContent.description.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index < aboutContent.description.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="text-center hidden-lg hidden-md">
                        <span className="s2_v">Show more</span>
                    </div>
                </div>
            </div>

            {/* Locations Section */}
            <section className="s sH s3">
                <div className="container">
                    <div className="s_h">
                        <h2 className="s_t">OUR LOCATIONS</h2>
                        <p className="s_p">We currently offer services at the following locations</p>
                    </div>
                    <div className="s2_m">
                        <div className="s2_mw">
                            <div className="s2_sw swiper js-sw3">
                                <div className="swiper-wrapper">
                                    {/* Location 1 */}
                                    <div className="swiper-slide">
                                        <div className="s2_i">
                                            <div className="s3_a">
                                                <div className="s3i swiper js-s3i">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <div className="s3i_a">
                                                                <Image
                                                                    src="/images/2501a13248def0544df4943d3312fb4b.jpg"
                                                                    alt="Orient Spa & Nails"
                                                                    width={400}
                                                                    height={300}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="s2_b">
                                                <h3 className="s2_t">
                                                    <Link href="/spa/orient-spa-nails">Orient Spa &amp; Nails</Link>
                                                </h3>
                                                <div className="s2_d">No 18 Bao Khanh, Hoan Kiem, Hanoi</div>
                                                <ul className="s2_c">
                                                    <li>Max capacity: 18 guests</li>
                                                    <li>Single/double/triple room available</li>
                                                    <li>Open Daily: 10:00am - 10:00pm</li>
                                                    <li>
                                                        Enquiry by phone or WhatsApp/Kakao:{' '}
                                                        <strong className="inline-block">(+84) 866 903 499</strong>
                                                    </li>
                                                </ul>
                                                <Link href="/spa/orient-spa-nails" className="s2_y">
                                                    DISCOVER MORE
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add more location slides here */}
                                </div>
                            </div>
                        </div>
                        <Link href="/reservation" className="btn btn-1 s2_u">
                            Make A Reservation
                        </Link>
                    </div>
                    <div className="s2_f">
                        <Image
                            src="/images/spa-map.jpg"
                            alt="Spa Location Map"
                            width={600}
                            height={400}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Promotions Section */}
            <div className="s sH s4">
                <div className="container">
                    <div className="s_h">
                        <h2 className="s_t">{promotionsSection.title}</h2>
                        <p className="s_p">{promotionsSection.subtitle}</p>
                    </div>
                    <div className="s4_m">
                        <div className="s4_mw">
                            <div className="s4_sw swiper js-sw4">
                                <div className="swiper-wrapper">
                                    {promotionsSection.promotions.map((promotion) => (
                                        <div key={promotion.id} className="swiper-slide">
                                            <div className="s4_i">
                                                <div className="s4_a">
                                                    <Image
                                                        src={promotion.image}
                                                        alt={promotion.title}
                                                        width={300}
                                                        height={200}
                                                    />
                                                    <div className="s4_ac fl fl-3">
                                                        <span className="s4_ad">{promotion.duration}</span>
                                                        <span className="s4_an">{promotion.price}</span>
                                                    </div>
                                                </div>
                                                <div className="s2_b">
                                                    <h3 className="s2_t">
                                                        <Link href={promotion.href}>{promotion.title}</Link>
                                                    </h3>
                                                    <ul className="s2_c">
                                                        {promotion.features.map((feature, index) => (
                                                            <li key={index}>{feature}</li>
                                                        ))}
                                                    </ul>
                                                    <Link href={promotion.href} className="s2_y">
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="s6_f fl fl-2">
                            <Link href="/services-prices" className="btn btn-2 s6_fa">
                                View Spa Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="s sH s7">
                <div className="container">
                    <div className="s_h">
                        <h2 className="s_t">{whyChooseUsSection.title}</h2>
                        <p className="s_p">{whyChooseUsSection.subtitle}</p>
                    </div>
                    <div className="s7_m">
                        <div className="s_g x3">
                            {whyChooseUsSection.features.map((feature) => (
                                <div key={feature.id} className="s_gc">
                                    <div className="s7_i">
                                        <div className="s7_a">
                                            <i className={feature.icon}></i>
                                        </div>
                                        <div className="s7_c">
                                            <h3 className="s7_t" dangerouslySetInnerHTML={{ __html: feature.title }}></h3>
                                            <p className="s7_p">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeContent;
