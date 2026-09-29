import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { salonServices, salonArtists } from '../data/salonData';
import { X, CheckCircle2, ArrowRight, Calendar, User, Phone, Mail, Scissors } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetService?: string;
  presetArtist?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  presetService = '',
  presetArtist = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(presetService || salonServices[0].name);
  const [artist, setArtist] = useState(presetArtist || 'First Available Master');
  const [date, setDate] = useState('2026-10-06');
  const [time, setTime] = useState('11:30 AM');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (presetService) setService(presetService);
    if (presetArtist) setArtist(presetArtist);
  }, [presetService, presetArtist]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const conf = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
    setCode(conf);
    setIsConfirmed(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#deb852', '#f3e5cb', '#ffffff', '#c99b3b'],
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#120f0d] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full luxury-glass text-[#a89d8d] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isConfirmed ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider">
              Booking Confirmed · {code}
            </div>
            <h3 className="text-2xl font-serif text-white">We Look Forward To Welcoming You</h3>
            <p className="text-xs text-[#baa995] leading-relaxed">
              Your appointment for <strong className="text-white">{service}</strong> on {date} at {time} is confirmed. A luxury preparation guide has been dispatched to {email || 'your email'}.
            </p>
            <button
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#d4af37]/15 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                PRIVATE ATELIER RESERVATION
              </span>
              <h3 className="text-2xl font-serif text-white">Book Your Experience</h3>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#ded2be] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adrienne Laurent"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#ded2be] block mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#ded2be] block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@vip.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#ded2be] block mb-1">
                  Service / Package
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1815] border border-white/10 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                >
                  {salonServices.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                  <option value="Essential Glow Package">Essential Glow Package ($145)</option>
                  <option value="Lumière Signature Package">Lumière Signature Package ($280)</option>
                  <option value="Lumière Haute VIP Package">Lumière Haute VIP Package ($495)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#ded2be] block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#ded2be] block mb-1">
                    Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1c1815] border border-white/10 text-white text-xs focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#c99b3b] shadow-lg transition-all"
            >
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
