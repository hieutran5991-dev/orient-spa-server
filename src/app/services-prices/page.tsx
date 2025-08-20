'use client';

import '@/css/services.css';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { serviceCategories } from '@/mock/servicesData';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('tab-1'); 
  const bookService = (serviceId: number) => {
    window.location.href = `/booking?service=${serviceId}`;
  };

  return (
    <Layout>
      <div className="s a2 text-center">
        <h1 className="a2_t">Our treatments</h1>
      </div>
      
      <div className="s sH s8">
        <div className="container">
          <div className="a8_c text-center">
            <p>
              You can find below our treatment menu and make online bookings. And don&apos;t forget to check out our{' '}
              <a href="/promotions">monthly promotions</a>, which can even get you another free treatment! 
              For last minute booking please contact our hotline: <strong>0977 903 499</strong> to guarantee service.
            </p>
            <a 
              href="/static/images/Orient-Spa-Menu-2024_2025.pdf" 
              download 
              className="btn btn-1 btn-block a5_sa"
            >
              Download full menu
            </a>
          </div>
          
          <div className="s8_m">
            <div className="s_h">
              <h1 className="s_t2">Orient Spa Treatment Menu</h1>
            </div>
            
            <div className="s8_b">
              <div className="s8_n">
                <ul className="tabs s8_nm">
                  {serviceCategories.map((category) => (
                    <li 
                      key={category.id}
                      className={activeTab === category.id ? 'active' : ''}
                      data-tab={category.id}
                      onClick={() => setActiveTab(category.id)}
                    >
                      <span>{category.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="s8_c">
                {serviceCategories.map((category) => (
                  <div 
                    key={category.id}
                    className={`tab-content ${activeTab === category.id ? 'active' : ''}`}
                    id={category.id}
                  >
                    {category.services.map((service) => (
                      <div key={service.id} className="s8_i">
                        <div className="s8_c">
                          <h2 className="s8_l" id={`name${service.id}`}>
                            {service.name}
                          </h2>
                          {service.description && (
                            <div className="s8_p">
                              <p>
                                {service.description.split('\n').map((line, index) => (
                                  <span key={index}>
                                    {line}
                                    {index < service.description.split('\n').length - 1 && <br />}
                                  </span>
                                ))}
                              </p>
                            </div>
                          )}
                          <div className="s8_d">
                            <span>{service.duration}</span>
                            <strong>{service.price}</strong>
                          </div>
                        </div>
                        <span 
                          className="btn btn-2 s8_v js-bk" 
                          onClick={() => bookService(service.id)}
                        >
                          Book Now
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="s8_f">
              <div className="a8_c text-center">
                <p>
                  <strong>NOTE:</strong> You can select more than one treatment for each guest on the booking page. 
                  If you need to book for group of 10 guests or more please{' '}
                  <a href="/contact">contact us</a>. We look forward to serving you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
