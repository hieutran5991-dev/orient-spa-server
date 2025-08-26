'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: '吳柏彥',
    location: 'Guangxi, China',
    date: '08 May 2025',
    type: 'Family',
    rating: 5,
    image: '/images/fb/53fbe1660d87c941a9bf44ef1cd186bc.jpg',
    review: '我們沒有預約，第一次帶媽媽來按摩，儘管如此，服務人員很客氣，也給我們說服務項目並提供預約時間。後來我們來了兩次，並因為生意很好，多付一次錢，他們有發現並告知我們扣回，覺得優良企業。服務很棒，推薦大家'
  },
  {
    id: 2,
    name: 'Loisy',
    location: 'New South Wales, AU',
    date: '10 February 2025',
    type: 'Couples',
    rating: 5,
    image: '/images/fb/e4e3927e6fc665305640c3c4f7d9e389.jpg',
    review: 'We had a lovely relaxing afternoon at the spa. The ladies at the desk are very helpful and give you green tea before going in for treatment. We both had a body scrub, herbal bath, massage and facial. They brought us a cup of green tea to have in the bath and a delicious piece of cake. After this I had hot stones and my partner had an aroma oil massage. We both enjoyed our massage and the ladies listened to us when asking to have a little less pressure. Our facial was amazing too, would recommend to anyone in Hanoi 🩷'
  },
  {
    id: 3,
    name: 'Catherine Valentine',
    location: 'Bath, United Kingdom',
    date: '15 January 2025',
    type: 'Couples',
    rating: 5,
    image: '/images/fb/6d5d81e72e136cb4fa6489d3bfdb3ccd.jpg',
    review: 'Wonderful spa! We got the healing touch package and they were happy to fit us in last minute and adapt the package to our needs. Everyone was professional, friendly and nice. Very relaxing atmosphere and we left feeling great, highly recommend.'
  },
  {
    id: 4,
    name: 'Aedan Gibson',
    location: 'Alberta, Canada',
    date: '09 June 2025',
    type: 'Solo',
    rating: 5,
    image: '/images/fb/fe42e6cb8d1b84ffdfd97167e988aaa9.jpg',
    review: 'I visited Orient Spa on my final evening in Hanoi for their signature 4-in-1 full body massage. The reservation process was smooth, they accept card, speak both English and Korean, and overall were very kind and made me feel very comfortable. Massage was great and I\'m very satisfied with the experience. I\'ll be back if I visit Hanoi again! :)'
  },
  {
    id: 5,
    name: 'Yeseul Choi',
    location: 'Seoul, South Korea',
    date: '08 June 2025',
    type: 'Group of friends',
    rating: 5,
    image: '/images/fb/3af54ca35475bd569073742697069a68.jpg',
    review: '완전 강력 추천합니다. 한국말 너무 잘하시는 직원분이 계셔서 너무 편하게 마사지를 받았어요! 마사지사들도 너무 시원하게 잘 해주시고 시설도 깨끗해요 ㅎㅎㅎ'
  },
  {
    id: 6,
    name: 'Jessi',
    location: 'China',
    date: '03 June 2025',
    type: 'Solo',
    rating: 5,
    image: '/images/fb/95/22/95224d28fc9c65f9879d5fe07728e00b.jpg',
    review: '聽同事推薦來的，提前預約比較保險，位置很方便，按摩洗頭很舒服，洗完頭變輕盈的感覺！下次還想體驗其他按摩'
  },
  {
    id: 7,
    name: 'GONNIE',
    location: 'South Korea',
    date: '09 May 2025',
    type: 'Family',
    rating: 5,
    image: '/images/fb/eea33eae3ab0ff815ea07b371581bbb3.jpg',
    review: '90분 딥티슈마사지와 페디큐어를 받았어요. 미리 카카오톡으로 예약하고 올 수 있어서 넘 좋았구요. 공항에서 여기로 바로 왔더니 짐도 맡겨주셔서 편히 여행하고 돌아와 마사지 받았습니다. 따뜻하고 편안한 분위기 속에 마사지 받을 수 있었어요. 마사지 평소에 자주 받는 엄마도 만족해하셨어요. 사파 관광 후 다시 하노이 와서 여기서 다시 마사지 받을거예요.'
  }
];

const swiperConfig = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
};

const People: React.FC = () => {
  return (
    <div className="s sH s5">
      <div className="container">
        <div className="s_h">
          <h2 className="s_t">What Guests are saying...</h2>
          <p className="s_p">
            We hope you enjoy reading our guests' reviews as much as ours. To all of us at Orient Spa,
            this means more than anything else.
          </p>
        </div>

        <div className="s5_m">
          <div className="s5_mw">
            <Swiper
              slidesPerView={swiperConfig.slidesPerView}
              spaceBetween={swiperConfig.spaceBetween}
              loop={swiperConfig.loop}
              autoplay={swiperConfig.autoplay}
              pagination={swiperConfig.pagination}
              breakpoints={swiperConfig.breakpoints}
              modules={[Pagination, Autoplay]}
              className="s5_sw"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="s5_i">
                    <div className="s5_iw">
                      <div className="s5_a">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={380}
                          height={300}
                        />
                      </div>

                      <div className="s5_b">
                        <div className="s5_r">
                          <div className="rv1">
                            <span style={{ width: `${(testimonial.rating / 5) * 100}%` }}></span>
                          </div>
                        </div>

                        <figure className="s5_q">
                          <blockquote>
                            <p>{testimonial.review}</p>
                          </blockquote>
                          <figcaption>
                            {testimonial.name} <cite>{testimonial.location}</cite>
                          </figcaption>
                        </figure>

                        <div className="s5_d">
                          {testimonial.date} <span>●</span> {testimonial.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
