'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="f">
      <div className="f_m">
        <div className="container">
          <div className="f_mw">
            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">Our locations</h4>
                <div className="f_c">
                  <dl>
                    <dt>Orient Spa &amp; Nails (Hoan Kiem Lake Branch)</dt>
                    <dd>
                      Address: 18 Bao Khanh, Hoan Kiem, Hanoi{' '}
                      <a 
                        href="https://maps.app.goo.gl/HCLkqkxV6t1hNgfs9" 
                        target="_blank" 
                        rel="nofollow"
                      >
                        (View map)
                      </a>
                    </dd>
                    <dd>
                      <i className="fa fa-phone"></i> +84.866.903.499
                    </dd>
                  </dl>
                  <dl>
                    <dt>Orient Spa Hanoi (Cathedral Branch)</dt>
                    <dd>
                      Address: 26 Au Trieu, Hoan Kiem, Hanoi{' '}
                      <a 
                        href="https://maps.app.goo.gl/b7QLxy5jW13wE3PG6" 
                        target="_blank" 
                        rel="nofollow"
                      >
                        (View map)
                      </a>
                    </dd>
                    <dd>
                      <i className="fa fa-phone"></i> +84.977.903.499
                    </dd>
                  </dl>
                  <dl>
                    <dt>La Flora by Orient (Cathedral Branch)</dt>
                    <dd>
                      Address: 22 Au Trieu, Hoan Kiem, Hanoi{' '}
                      <a 
                        href="https://maps.app.goo.gl/2nkrCJ3krkzKLpKN6" 
                        target="_blank" 
                        rel="nofollow"
                      >
                        (View map)
                      </a>
                    </dd>
                    <dd>
                      <i className="fa fa-phone"></i> +84.867.903.499
                    </dd>
                  </dl>
                  <p>
                    <strong>KakaoID:</strong> orienthanoi / orientspa72
                  </p>
                </div>
              </div>
            </div>
            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">About Orient Spa</h4>
                <div className="f_c">
                  <ul className="f_n fl">
                    <li><Link href="/page/about-us">About Us</Link></li>
                    <li><Link href="/services-prices">Spa Menu</Link></li>
                    <li><Link href="/promotions">Promotions</Link></li>
                    <li><Link href="/contact-us">Contact Us</Link></li>
                    <li><Link href="/reservation">Book Online</Link></li>
                    <li><Link href="/blog">Blogs</Link></li>
                  </ul>
                </div>
              </div>
              <div className="f_i">
                <h4 className="f_t">Opening Hours</h4>
                <div className="f_c">
                  <p className="f_o">
                    We are open daily from <strong>10:00AM - 10:00PM.</strong><br />
                    Advanced reservation is recommended.
                  </p>
                </div>
              </div>
            </div>

            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">Follow us</h4>
                <div className="f_c">
                  <div className="f_s fl">
                    <span>
                      <a 
                        href="https://www.facebook.com/orientspahanoi" 
                        target="_blank" 
                        rel="nofollow"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </span>
                    <span>
                      <a 
                        href="https://www.instagram.com/orientnailspa?igsh=MXNyNjZmZ3Y1bjVpcA==" 
                        target="_blank" 
                        rel="nofollow"
                      >
                        <i className="fa fa-instagram"></i>
                      </a>
                    </span>
                    <span>
                      <a 
                        href="https://www.tripadvisor.com.vn/Attraction_Review-g293924-d12940258-Reviews-Orient_Spa-Hanoi.html" 
                        target="_blank" 
                        rel="nofollow"
                      >
                        <i className="fa fa-tripadvisor"></i>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="f_mi">
              <div className="f_i">
                <h4 className="f_t">Payment Methods</h4>
                <div className="f_c">
                  <Image 
                    src="/fonts/payment-methods.svg" 
                    alt="Payment Methods" 
                    width={200} 
                    height={40} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="f_k hidden-lg hidden-md">
            <div className="sP">
              <div className="sP_i" id="toTop">
                <span>
                  <i className="fa fa-angle-up"></i>
                </span>
              </div>
              <a 
                href="https://qr.kakao.com/talk/EicqtwXI6griqg1G99.rFTSkaJo-" 
                rel="nofollow" 
                target="_blank" 
                className="sP_i"
              >
                <span>
                  <i className="ic ic-talk"></i>
                </span>
              </a>
              <a 
                href="https://wa.me/84977903499" 
                rel="nofollow" 
                target="_blank" 
                className="sP_i"
              >
                <span>
                  <Image 
                    src="/fonts/whatsapp-icon.svg" 
                    alt="WhatsApp" 
                    width={20} 
                    height={20} 
                  />
                </span>
              </a>
              <a 
                href="https://zalo.me/84866903499" 
                rel="nofollow" 
                target="_blank" 
                className="sP_i"
              >
                <span>
                  <Image 
                    src="/fonts/zalo-icon.svg" 
                    alt="Zalo" 
                    width={20} 
                    height={20} 
                  />
                </span>
              </a>
              <a href="tel:+84977903499" className="sP_i" data-title="0977903499">
                <span>
                  <i className="ic ic-phone"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="f_e">
        <div className="container">
          <div>Copyright 2025 © Orientspahanoi. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
