'use client';

import '@/css/promotion.css';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { promotionsData, getFeaturedPromotions } from '@/mock/promotionsData';

export default function PromotionsPage() {
  const [showAll, setShowAll] = useState(false);
  const featuredPromotions = getFeaturedPromotions();
  const displayPromotions = showAll ? promotionsData : featuredPromotions;

  const handleBookPromotion = (promotionId: string) => {
    // Navigate to booking page with promotion parameter
    window.location.href = `/booking?promotion=${promotionId}`;
  };

  return (
    <Layout>
      <div className="s a2 text-center">
        <h1 className="a2_t">Promotions</h1>
      </div>
      
      <div className="s a3 text-center">
        <ul className="breadcrumb">
          <li><Link href="/">Home</Link></li>
          <li>Promotions</li>
        </ul>
      </div>

      <section className="s k1">
        <div className="container">
          <div className="s_h">
            <h2 className="s_t2">Orient Spa Promotions August 2025</h2>
            <p className="promotion-subtitle">
              Discover our exclusive spa packages and seasonal offers. 
              Book now and save on premium wellness treatments!
            </p>
          </div>

          <div className="promotion-filter">
            <button 
              className={`filter-btn ${!showAll ? 'active' : ''}`}
              onClick={() => setShowAll(false)}
            >
              Featured Offers
            </button>
            <button 
              className={`filter-btn ${showAll ? 'active' : ''}`}
              onClick={() => setShowAll(true)}
            >
              All Promotions
            </button>
          </div>

          <div className="k1_m">
            <div className="s_g x3">
              {displayPromotions.map((promotion) => (
                <div key={promotion.id} className="s_gc">
                  <div className="k1_i">
                    <div 
                      className="k1_a" 
                      style={{ backgroundImage: `url(${promotion.imageUrl})` }}
                    >
                      <img 
                        src={promotion.imageUrl} 
                        alt={`${promotion.title} - ${promotion.duration}`}
                        onError={(e) => {
                          // Fallback to a default image if the image fails to load
                          (e.target as HTMLImageElement).src = '/images/default-spa.jpg';
                        }}
                      />
                      {promotion.price && (
                        <div className="price-badge">
                          <span className="original-price">{promotion.price.original}</span>
                          <span className="discounted-price">{promotion.price.discounted}</span>
                        </div>
                      )}
                      {promotion.featured && (
                        <div className="featured-badge">Featured</div>
                      )}
                    </div>
                    
                    <div className="k1_b">
                      <h2 className="k1_t">
                        <Link href={`/promotions/${promotion.slug}`}>
                          {promotion.title} - {promotion.duration}
                        </Link>
                      </h2>
                      
                      <ul className="s2_c">
                        {promotion.description.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      {promotion.validUntil && (
                        <div className="valid-until">
                          <strong>Valid until: {promotion.validUntil}</strong>
                        </div>
                      )}
                      
                      <div className="promotion-actions">
                        <Link href={`/promotions/${promotion.slug}`} className="k1_v">
                          READ MORE
                        </Link>
                        <button 
                          className="btn btn-book-promo"
                          onClick={() => handleBookPromotion(promotion.id)}
                        >
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!showAll && promotionsData.length > featuredPromotions.length && (
            <div className="view-all-section">
              <button 
                className="btn btn-view-all"
                onClick={() => setShowAll(true)}
              >
                View All Promotions ({promotionsData.length - featuredPromotions.length} more)
              </button>
            </div>
          )}

          <div className="promotion-notice">
            <div className="notice-content">
              <h3>Important Information</h3>
              <ul>
                <li>All promotions are subject to availability</li>
                <li>Advance booking is recommended</li>
                <li>Promotions cannot be combined with other offers</li>
                <li>Valid ID required for student and member discounts</li>
                <li>Prices include all taxes and service charges</li>
              </ul>
              <p>
                For group bookings of 6 or more people, please{' '}
                <Link href="/contact">contact us</Link> directly for special rates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
