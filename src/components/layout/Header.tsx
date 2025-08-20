'use client';

import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="h">
            <div className="container">
                <div className="h_w fl">
                    <span className="h_z hidden-lg hidden-md">
                        <i className="ic ic-bars"></i>
                    </span>
                    <div className="h_c w1">
                        <div className="h_a fl fl-2">
                            <Link href="/">
                                <Image src="/fonts/orientspahanoi.svg" alt="Orient Spa Hanoi" width={150} height={40} />
                            </Link>
                        </div>
                    </div>
                    <div className="h_c w2 h1">
                        <span className="h_x hidden-lg hidden-md">
                            <i className="ic ic-close"></i>
                        </span>
                        <ul className="h_n n1 fl">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/services-prices.html">Spa menu</Link></li>
                            <li><Link href="/promotions.html">Promotions</Link></li>
                        </ul>
                        <div className="h_v hidden-lg hidden-md">
                            <Link href="/reservation.html">
                                <span className="btn btn-1 btn-block">Make A Reservation</span>
                            </Link>
                        </div>
                    </div>
                    <div className="h_c w2 h2 hidden-sm hidden-xs">
                        <ul className="h_n n2 fl">
                            <li className="h_d lhs">
                                <span>About Us <i className="fa fa-angle-down"></i></span>
                                <ul className="h_s w1">
                                    <li><Link href="/page/about-us.html">About Orient Spa</Link></li>
                                    <li>
                                        <ul>
                                            <li><Link href="/spa/orient-spa-old-quarter.html">Orient at 26 Au Trieu</Link></li>
                                            <li><Link href="/spa/orient-spa-nails.html">Orient at 18 Bao Khanh</Link></li>
                                            <li><Link href="/spa/la-flora-by-orient.html">La Flora at 22 Au Trieu</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="/gallery.html">Our happy guests</Link></li>
                                    <li><Link href="/blog.html">Blogs</Link></li>
                                </ul>
                            </li>
                            <li className="lhs"><Link href="/contact-us.html">Contact</Link></li>
                            <li className="lhs"><Link href="/reservation.html">Book Online</Link></li>
                            <li className="lgs">
                                <span className="lgs_h"><i className="ic ic-language"></i></span>
                                <ul className="h_s w2">
                                    <li><Link href="/">English</Link></li>
                                    <li><Link href="/zh-hans">Chinese (中文)</Link></li>
                                    <li><Link href="/ja">Japanese (日本語)</Link></li>
                                    <li><Link href="/ko">Korean (한국어)</Link></li>
                                    <li><Link href="/es">Spanish (Español)</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="h_l hidden-lg hidden-md">
                        <ul></ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
