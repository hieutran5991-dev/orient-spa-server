'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getPromotionBySlug, getAllPromotions, Promotion } from '@/mock/promotionsData';

export default function PromotionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [relatedPromotions, setRelatedPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    if (slug) {
      const foundPromotion = getPromotionBySlug(slug);
      setPromotion(foundPromotion || null);
      
      // Get related promotions (excluding current one)
      const allPromotions = getAllPromotions();
      const related = allPromotions
        .filter(p => p.slug !== slug && p.featured)
        .slice(0, 3);
      setRelatedPromotions(related);
    }
  }, [slug]);

  const handleBookPromotion = () => {
    if (promotion) {
      window.location.href = `/booking?promotion=${promotion.id}`;
    }
  };

  if (!promotion) {
    return (
      <Layout>
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h1>Promotion Not Found</h1>
          <p>The promotion you're looking for doesn't exist or has been removed.</p>
          <Link href="/promotions" className="btn btn-primary">
            View All Promotions
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="s a3 text-center">
        <ul className="breadcrumb">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/promotions">Promotions</Link></li>
          <li>{promotion.title}</li>
        </ul>
      </div>

      <div className="promotion-detail">
        <div className="container">
          <div className="promotion-hero">
            <div className="promotion-image">
              <img 
                src={promotion.imageUrl} 
                alt={promotion.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/default-spa.jpg';
                }}
              />
              {promotion.featured && (
                <div className="featured-badge">Featured Offer</div>
              )}
            </div>
            
            <div className="promotion-info">
              <h1 className="promotion-title">
                {promotion.title}
                <span className="duration-badge">{promotion.duration}</span>
              </h1>
              
              {promotion.price && (
                <div className="price-section">
                  <div className="price-original">Regular Price: {promotion.price.original}</div>
                  <div className="price-special">Special Price: {promotion.price.discounted}</div>
                  <div className="savings">
                    You Save: {(
                      parseInt(promotion.price.original.replace(/[^0-9]/g, '')) - 
                      parseInt(promotion.price.discounted.replace(/[^0-9]/g, ''))
                    ).toLocaleString()} VND
                  </div>
                </div>
              )}
              
              {promotion.validUntil && (
                <div className="validity">
                  <strong>🕐 Valid until: {promotion.validUntil}</strong>
                </div>
              )}
              
              <button 
                className="btn btn-book-large"
                onClick={handleBookPromotion}
              >
                Book This Promotion Now
              </button>
            </div>
          </div>

          <div className="promotion-content">
            <div className="main-content">
              <h2>What's Included</h2>
              <ul className="included-services">
                {promotion.description.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>

              <div className="promotion-benefits">
                <h3>Why Choose This Package?</h3>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <div className="benefit-icon">💆‍♀️</div>
                    <h4>Professional Therapists</h4>
                    <p>Our certified massage therapists have years of experience in Oriental wellness techniques.</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🌿</div>
                    <h4>Natural Ingredients</h4>
                    <p>We use only premium, natural oils and herbs for all our treatments.</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">✨</div>
                    <h4>Relaxing Environment</h4>
                    <p>Enjoy our peaceful spa atmosphere designed for ultimate relaxation.</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">💎</div>
                    <h4>Premium Service</h4>
                    <p>Experience luxury spa service at an exceptional value with our promotion.</p>
                  </div>
                </div>
              </div>

              <div className="terms-conditions">
                <h3>Terms & Conditions</h3>
                <ul>
                  <li>Advance booking required - subject to availability</li>
                  <li>Valid for new and existing customers</li>
                  <li>Cannot be combined with other promotions or discounts</li>
                  <li>Treatment must be completed by the expiry date</li>
                  <li>Vouchers are non-refundable and non-transferable</li>
                  <li>Prices include all taxes and service charges</li>
                  <li>Cancellation must be made 24 hours in advance</li>
                </ul>
              </div>
            </div>

            <div className="sidebar">
              <div className="booking-widget">
                <h3>Ready to Book?</h3>
                <p>Don't miss out on this amazing offer!</p>
                <button 
                  className="btn btn-book-sidebar"
                  onClick={handleBookPromotion}
                >
                  Book Now
                </button>
                <div className="contact-info">
                  <p>Need help? Call us:</p>
                  <a href="tel:0977903499" className="phone-number">0977 903 499</a>
                </div>
              </div>

              <div className="share-section">
                <h4>Share This Offer</h4>
                <div className="share-buttons">
                  <button className="share-btn facebook">Facebook</button>
                  <button className="share-btn whatsapp">WhatsApp</button>
                  <button className="share-btn copy">Copy Link</button>
                </div>
              </div>
            </div>
          </div>

          {relatedPromotions.length > 0 && (
            <div className="related-promotions">
              <h2>Other Featured Promotions</h2>
              <div className="related-grid">
                {relatedPromotions.map(relatedPromo => (
                  <div key={relatedPromo.id} className="related-item">
                    <Link href={`/promotions/${relatedPromo.slug}`}>
                      <img src={relatedPromo.imageUrl} alt={relatedPromo.title} />
                      <h4>{relatedPromo.title}</h4>
                      {relatedPromo.price && (
                        <div className="related-price">{relatedPromo.price.discounted}</div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .promotion-detail {
          padding: 40px 0;
        }

        .promotion-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
          align-items: start;
        }

        .promotion-image {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }

        .promotion-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        .featured-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: linear-gradient(45deg, #FF6B35, #F7931E);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
        }

        .promotion-title {
          font-size: 32px;
          color: #333;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .duration-badge {
          background: #2c5aa0;
          color: white;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: normal;
        }

        .price-section {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          padding: 25px;
          border-radius: 12px;
          margin: 25px 0;
          border-left: 5px solid #28a745;
        }

        .price-original {
          color: #666;
          text-decoration: line-through;
          font-size: 16px;
        }

        .price-special {
          color: #28a745;
          font-size: 24px;
          font-weight: bold;
          margin: 5px 0;
        }

        .savings {
          color: #FF6B35;
          font-weight: bold;
          font-size: 18px;
        }

        .validity {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: center;
          color: #856404;
        }

        .btn-book-large {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .btn-book-large:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
        }

        .promotion-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        .included-services {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          list-style: none;
          margin: 20px 0;
        }

        .included-services li {
          padding: 12px 0;
          padding-left: 30px;
          position: relative;
          border-bottom: 1px solid #f0f0f0;
          font-size: 16px;
          color: #333;
        }

        .included-services li:last-child {
          border-bottom: none;
        }

        .included-services li:before {
          content: "✅";
          position: absolute;
          left: 0;
          top: 12px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin: 25px 0;
        }

        .benefit-item {
          background: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
        }

        .benefit-item:hover {
          transform: translateY(-5px);
        }

        .benefit-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .benefit-item h4 {
          color: #2c5aa0;
          margin: 10px 0;
        }

        .terms-conditions {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 12px;
          margin: 30px 0;
        }

        .terms-conditions h3 {
          color: #2c5aa0;
          margin-top: 0;
        }

        .terms-conditions ul {
          margin: 15px 0;
          padding-left: 20px;
        }

        .terms-conditions li {
          margin: 8px 0;
          color: #555;
          line-height: 1.5;
        }

        .booking-widget {
          background: linear-gradient(135deg, #2c5aa0, #1e3a6f);
          color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 25px;
        }

        .btn-book-sidebar {
          width: 100%;
          padding: 15px;
          background: white;
          color: #2c5aa0;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin: 15px 0;
          transition: transform 0.3s ease;
        }

        .btn-book-sidebar:hover {
          transform: translateY(-2px);
        }

        .phone-number {
          color: #FFD700;
          font-size: 18px;
          font-weight: bold;
          text-decoration: none;
        }

        .share-section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .share-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .share-btn {
          padding: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: opacity 0.3s ease;
        }

        .share-btn:hover {
          opacity: 0.8;
        }

        .share-btn.facebook {
          background: #3b5998;
          color: white;
        }

        .share-btn.whatsapp {
          background: #25D366;
          color: white;
        }

        .share-btn.copy {
          background: #6c757d;
          color: white;
        }

        .related-promotions {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 2px solid #e9ecef;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-top: 25px;
        }

        .related-item {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
        }

        .related-item:hover {
          transform: translateY(-5px);
        }

        .related-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .related-item h4 {
          padding: 15px;
          margin: 0;
          color: #333;
        }

        .related-price {
          padding: 0 15px 15px;
          color: #28a745;
          font-weight: bold;
        }

        .breadcrumb {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 0;
          margin: 20px 0 40px;
        }

        .breadcrumb li {
          color: #666;
        }

        .breadcrumb li:not(:last-child):after {
          content: " → ";
          margin-left: 10px;
        }

        .breadcrumb a {
          color: #2c5aa0;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .promotion-hero {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .promotion-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .promotion-title {
            font-size: 24px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}
