'use client';

import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/ContactForm';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations();
    return (
        <Layout className="contact-container">
            <div className="s sH">
                <div className="container">
                    <div className="s_h text-center">
                        <h1 className="s_t">{t('contact.title')}</h1>
                        <p className="s_p">{t('contact.subtitle')}</p>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </Layout>
    );
}
