'use client';

import '../css/booking.css'
import Layout from '@/components/layout/Layout';
import BookingContent from '@/components/BookingContent';
import Script from 'next/script';
import { useEffect } from 'react';

export default function BookingPage() {
    return (
        <Layout className="booking-container">
            <BookingContent />

            <Script src="/js/booking.js" strategy="afterInteractive" />
        </Layout>
    );
}
