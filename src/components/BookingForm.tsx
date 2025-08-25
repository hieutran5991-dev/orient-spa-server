'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { BOOKING_INIT_KEY, type Locale } from '@/utils/constants';
import type { NamespaceKeys } from "use-intl";
import { SpaLocation } from "@/types/api";
import { BookingData } from "@/types/booking";

interface BookingFormProps {
  spaLocations: SpaLocation[];
}

const BookingForm = ({ spaLocations }: BookingFormProps) => {
  const locale = useLocale() as Locale;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpa, setSelectedSpa] = useState('');
  const [selectedSpaId, setSelectedSpaId] = useState<string | number>('');
  const [showSpaDropdown, setShowSpaDropdown] = useState(false);

  const tBooking = useTranslations('booking' as NamespaceKeys<string, string>);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const bookingData: BookingData = {
      agency_name: selectedSpa,
      agency_id: selectedSpaId,
      booking_date: formData.get('date') as string,
      booking_time: formData.get('time') as string,
      people: formData.get('people') as string
    };

    try {
      sessionStorage.setItem(BOOKING_INIT_KEY, JSON.stringify(bookingData));
      window.location.href = `/${locale}/booking`;
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = {
    availabilityDate: tBooking('today'),
    periods: [
      {
        id: 1,
        period: tBooking('morning'),
        times: ["10:00", "10:30", "11:00", "11:30"]
      },
      {
        id: 2,
        period: tBooking('afternoon'),
        times: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"]
      },
      {
        id: 3,
        period: tBooking('evening'),
        times: ["19:00", "19:30", "20:00", "20:30"]
      }
    ]
  };

  const guestSelection = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSpaSelect = (spaName: string, spaId: string | number) => {
    setSelectedSpa(spaName);
    setSelectedSpaId(spaId);
    setShowSpaDropdown(false);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.s1_s2') && !target.closest('#f2')) {
        setShowSpaDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="s1">
      <form id="formBookBox" className="s1_f" onSubmit={handleSubmit}>
        <div className="s1_t hidden-lg hidden-md">
          <strong>{tBooking('title')}</strong>
          <i className="s1_z ic ic-close"></i>
        </div>
        <div className="row">
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                type="text"
                id="f2"
                name="spa"
                className="form-control u1 js-v2"
                value={selectedSpa}
                onChange={(e) => setSelectedSpa(e.target.value)}
                onFocus={() => {
                  setShowSpaDropdown(true);
                }}
                required
              />
              <label htmlFor="f2" className="s1_v">{tBooking('location')}</label>
              <span className="fc-feedback">
                <i className="fa fa-angle-down"></i>
              </span>

              <div
                className="s1_s w2 s1_s2"
                style={{
                  display: showSpaDropdown ? 'block' : 'none',
                }}
              >
                <div className="s1_sh hidden-lg hidden-md">
                  <div className="s1_st">{tBooking('selectLocation')}</div>
                  <span className="s1_x js-done" onClick={() => setShowSpaDropdown(false)}>
                    <i className="ic ic-close"></i>
                  </span>
                </div>
                <div className="s1_sd">
                  <ul className="s1_d">
                    {spaLocations && spaLocations.map((location) => (
                      <li
                        key={location.id}
                        onClick={() => handleSpaSelect(location.name, location.id)}
                      >
                        <strong>{location.name}</strong>
                        <span>{location.address}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="s1_sf hidden-lg hidden-md">
                  <span className="s1_su js-done btn btn-1 btn-block" onClick={() => setShowSpaDropdown(false)}>
                    {tBooking('done')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                type="text"
                id="date"
                name="date"
                className="form-control u1 js-v1"
                required
              />
              <label htmlFor="date" className="s1_v">{tBooking('date')}</label>
              <span className="fc-feedback">
                <i className="fa fa-calendar"></i>
              </span>
            </div>
          </div>
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                type="text"
                id="f3"
                name="time"
                className="form-control u1 js-v3"
                required
              />
              <label htmlFor="f3" className="s1_v">{tBooking('time')}</label>
              <span className="fc-feedback">
                <i className="fa fa-angle-down"></i>
              </span>

              <div className="s1_s w2 s1_s3">
                <div className="s1_sh hidden-lg hidden-md">
                  <div className="s1_st">{tBooking('selectTime')}</div>
                  <span className="s1_x js-done"><i className="ic ic-close"></i></span>
                </div>
                <div className="s1_sd">
                  <div className="s1_k" id="listTimes">
                    <div className="s1_l">{tBooking('availabilityFor')} {timeSlots.availabilityDate}</div>

                    {timeSlots.periods.map((period) => (
                      <dl key={period.id} className="s1_j">
                        <dt>{period.period}:</dt>
                        {period.times.map((time) => (
                          <dd key={time}>{time}</dd>
                        ))}
                      </dl>
                    ))}
                  </div>
                </div>
                <div className="s1_sf hidden-lg hidden-md">
                  <span className="s1_su js-done btn btn-1 btn-block">{tBooking('done')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="s1_g">
            <div className="form-group has-feedback">
              <input
                type="text"
                id="f4"
                name="people"
                className="form-control u1 js-v4"
                required
              />
              <label htmlFor="f4" className="s1_v">{tBooking('guest')}</label>
              <span className="fc-feedback">
                <i className="fa fa-angle-down"></i>
              </span>

              <div className="s1_s s1_s4">
                <div className="s1_sh hidden-lg hidden-md">
                  <div className="s1_st">{tBooking('selectGuest')}</div>
                  <span className="s1_x js-done"><i className="ic ic-close"></i></span>
                </div>
                <div className="s1_sd">
                  <ul className="s1_n">
                    {guestSelection.map((guestNumber) => (
                      <li key={guestNumber}>{guestNumber}</li>
                    ))}
                  </ul>
                </div>
                <div className="s1_sf hidden-lg hidden-md">
                  <span className="s1_su js-done btn btn-1 btn-block">{tBooking('done')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="error-message"
            style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-block btn-1 s1_u booknow"
          disabled={isSubmitting}
        >
          {isSubmitting ? tBooking('processing') : tBooking('bookNow')}
        </button>
      </form>
      <span className="a1_a btn hidden-lg hidden-md">{tBooking('bookNow')}</span>
    </div>
  );
};

export default BookingForm;
