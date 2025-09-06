'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/utils/constants';
import type {NamespaceKeys} from "use-intl";

// Guest photos data
const guestPhotos = [
	{
		id: 1,
		image: '/images/37f88d202b6673c7856ab3e5b274fce9.jpg',
		alt: 'Happy guest at SEN SPA Da Nang',
		instagramUrl: 'https://instagram.com/orientspahanoi'
	},
	{
		id: 2,
		image: '/images/1e7ee92c458392f5eab7dc3e5d87d364.jpg',
		alt: 'Guest enjoying spa treatment',
		instagramUrl: 'https://instagram.com/orientspahanoi'
	},
	{
		id: 3,
		image: '/images/188a3c349926d04d742c40dfed4b1590.jpg',
		alt: 'Relaxed guest after massage',
		instagramUrl: 'https://instagram.com/orientspahanoi'
	},
	{
		id: 4,
		image: '/images/837df7fd667c8f3f78fd2fa833a919b8.jpg',
		alt: 'Guest with facial treatment',
		instagramUrl: 'https://instagram.com/orientspahanoi'
	},
	{
		id: 5,
		image: '/images/10bd2e10764a565775b50a50c94fbd1d.jpg',
		alt: 'Happy couple at spa',
		instagramUrl: 'https://instagram.com/orientspahanoi'
	}
];

const Guests: React.FC = () => {
	const locale = useLocale() as Locale;
	const t = useTranslations('guests' as NamespaceKeys<string, string> );

	return (
		<div className="s sH s6">
			<div className="container">
				<div className="s_h">
					<h2 className="s_t">{t('title')}</h2>
					<p className="s_p">{t('subtitle')}</p>
				</div>

				<div className="s6_m">
					{guestPhotos.map((photo) => (
						<a
							key={photo.id}
							href={photo.instagramUrl}
							className="s6_i"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src={photo.image}
								alt={photo.alt}
								width={300}
								height={300}
								className="guest-photo"
							/>
							<span className="s6_a fa fa-instagram"></span>
						</a>
					))}
				</div>

				<div className="s6_f fl fl-2">
					<Link href={`/${locale}/gallery`} className="btn btn-2 s6_fa">
						{t('viewAllPhotos')}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Guests;


