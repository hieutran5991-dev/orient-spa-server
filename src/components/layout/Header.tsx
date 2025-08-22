'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { SUPPORTED_LANGUAGE, type Locale } from '@/utils/constants';

const Header = () => {
    const tCommon = useTranslations('common');
    const tBooking = useTranslations('booking');
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: Locale) => {
        const segments = pathname.split('/');
        if (SUPPORTED_LANGUAGE.includes(segments[1] as Locale)) {
            segments.splice(1, 1);
        }

        const newPath = `/${newLocale}${segments.join('/')}`;
        router.push(newPath);
    };
    return (
        <header className="h">
            <div className="container">
                <div className="h_w fl">
                    <span className="h_z hidden-lg hidden-md">
                        <i className="ic ic-bars"></i>
                    </span>
                    <div className="h_c w1">
                        <div className="h_a fl fl-2">
                            <a href={`/${locale}`}>
                                <Image src="/fonts/orientspahanoi.svg" alt="Orient Spa Hanoi" width={150} height={40} />
                            </a>
                        </div>
                    </div>
                    <div className="h_c w2 h1">
                        <span className="h_x hidden-lg hidden-md">
                            <i className="ic ic-close"></i>
                        </span>
                        <ul className="h_n n1 fl">
                            <li><a href={`/${locale}`}>{tCommon('navigation.home')}</a></li>
                            <li><a href={`/${locale}/services-prices`}>{tCommon('navigation.services')}</a></li>
                            <li><a href={`/${locale}/promotions`}>{tCommon('navigation.promotions')}</a></li>
                        </ul>
                        <div className="h_v hidden-lg hidden-md">
                            <Link href={`/${locale}/booking`}>
                                <span className="btn btn-1 btn-block">{tBooking('makeReservation')}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="h_c w2 h2 hidden-sm hidden-xs">
                        <ul className="h_n n2 fl">
                            <li className="h_d lhs">
                                <span>{tCommon('navigation.about')} <i className="fa fa-angle-down"></i></span>
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
                            <li className="lhs"><Link href={`/${locale}/contact`}>{tCommon('navigation.contact')}</Link></li>
                            <li className="lhs"><Link href={`/${locale}/booking`}>{tCommon('navigation.booking')}</Link></li>
                            <li className="lgs">
                                <span className="lgs_h"><i className="ic ic-language"></i></span>
                                <ul className="h_s w2">
                                    <li>
                                        <button
                                            onClick={() => handleLanguageChange('en')}
                                            className={`bg-transparent border-none text-inherit font-inherit cursor-pointer px-3 py-2 w-full text-left transition-colors duration-200 ease-in-out hover:bg-black/10 ${locale === 'en' ? 'bg-black/15 font-bold' : ''}`}
                                        >
                                            🇺🇸 {tCommon('languages.en')}
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleLanguageChange('vi')}
                                            className={`bg-transparent border-none text-inherit font-inherit cursor-pointer px-3 py-2 w-full text-left transition-colors duration-200 ease-in-out hover:bg-black/10 ${locale === 'vi' ? 'bg-black/15 font-bold' : ''}`}
                                        >
                                            🇻🇳 {tCommon('languages.vi')}
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleLanguageChange('ja')}
                                            className={`bg-transparent border-none text-inherit font-inherit cursor-pointer px-3 py-2 w-full text-left transition-colors duration-200 ease-in-out hover:bg-black/10 ${locale === 'ja' ? 'bg-black/15 font-bold' : ''}`}
                                        >
                                            🇯🇵 {tCommon('languages.ja')}
                                        </button>
                                    </li>
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
