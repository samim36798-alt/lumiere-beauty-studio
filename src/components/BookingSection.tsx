import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { salonServices, salonArtists } from '../data/salonData';
import { BookingData } from '../types';
import { Sparkles, Calendar, Clock, User, Phone, Mail, CheckCircle2, Scissors, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface BookingSectionProps {
  initialService?: string;
  initialArtist?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialService = '',
  initialArtist = '',
}) => {
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: initialService || salonServices[0].name,
    artistId: initialArtist || salonArtists[0].name,
    date: '2026-10-05',
    time: '14:00',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const availableTimes = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const code = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(code);
      setIsConfirmed(true);

      // Gold & champagne luxury confetti blast
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#deb852', '#f3e5cb', '#ffffff', '#c99b3b'],
        });
      } catch (err) {
        // ignore
      }
    }, 900);
  };

  return (
    <section id="contact" className="py-28 bg-[#0c0a09] relative overflow-hidden border-t border-[#d4af37]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Private Atelier Reservation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
            Reserve Your <span className="gold-gradient-text italic">Experience.</span>
          </h2>
          <p className="mt-4 text-[#bfb5a3] text-sm sm:text-base leading-relaxed">
            Select your preferred couture ritual and master artisan. Our client concierge will confirm your suite appointment within 15 minutes.
          </p>
        </div>

        {/* Booking Interface Box */}
        <div className="max-w-4xl mx-auto">
          {isConfirmed ? (
            /* Confirmation Celebration State */
            <div className="luxury-glass p-8 sm:p-14 rounded-3xl border border-[#d4af37]/50 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-[#d4af37]">
                  Reservation Confirmed · {confirmationCode}
                </span>
                <h3 className="text-3xl font-serif text-white mt-1">
                  We Await You, {formData.fullName || 'Esteemed Guest'}
                </h3>
                <p className="text-sm text-[#c7baa4] mt-2 max-w-md mx-auto leading-relaxed">
                  Your private suite has been reserved for <strong className="text-white">{formData.serviceId}</strong> with <strong className="text-white">{formData.artistId}</strong>.
                </p>
              </div>

              {/* Receipt details */}
              <div className="max-w-md mx-auto p-4 rounded-xl luxury-glass-light border border-white/10 text-left text-xs space-y-2">
                <div className="flex justify-between text-[#c4b59e]">
                  <span>Date & Time:</span>
                  <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between text-[#c4b59e]">
                  <span>Contact:</span>
                  <span className="text-white font-medium">{formData.email} · {formData.phone}</span>
                </div>
                <div className="flex justify-between text-[#c4b59e]">
                  <span>Atelier:</span>
                  <span className="text-white font-medium">Suite 4, 842 Avenue Montaigne</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsConfirmed(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#c99b3b] shadow-lg transition-all"
                >
                  Book Another Ritual
                </button>
                <a
                  href="#home"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#ded2be] hover:text-white luxury-glass"
                >
                  Return to Top
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form
              onSubmit={handleSubmit}
              className="luxury-glass p-8 sm:p-12 rounded-3xl border border-[#d4af37]/30 shadow-2xl space-y-8"
            >
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Geneviève Moreau"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@luxurymail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be] flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Select Service *</span>
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  >
                    {salonServices.map((s) => (
                      <option key={s.id} value={s.name} className="bg-[#14100e]">
                        {s.name} (${s.price})
                      </option>
                    ))}
                    <option value="Essential Glow Package" className="bg-[#14100e]">Essential Glow Package ($145)</option>
                    <option value="Lumière Signature Package" className="bg-[#14100e]">Lumière Signature Package ($280)</option>
                    <option value="Lumière Haute VIP Package" className="bg-[#14100e]">Lumière Haute VIP Package ($495)</option>
                  </select>
                </div>

                {/* Select Artist */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Select Master Artist</span>
                  </label>
                  <select
                    value={formData.artistId}
                    onChange={(e) => setFormData({ ...formData, artistId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  >
                    <option value="First Available Master" className="bg-[#14100e]">First Available Master Artist</option>
                    {salonArtists.map((a) => (
                      <option key={a.id} value={a.name} className="bg-[#14100e]">
                        {a.name} ({a.specialization})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Select Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>

              {/* Time Slots Chips */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Select Time Slot</span>
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {availableTimes.map((timeStr) => (
                    <button
                      type="button"
                      key={timeStr}
                      onClick={() => setFormData({ ...formData, time: timeStr })}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.time === timeStr
                          ? 'bg-[#d4af37] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)] font-semibold'
                          : 'luxury-glass text-[#ded2be] hover:text-white hover:border-[#d4af37]/40'
                      }`}
                    >
                      {timeStr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#ded2be]">
                  Additional Message or Special Hair/Skin Considerations
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Previous chemical treatments, upcoming gala event date, champagne preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest text-black bg-gradient-to-r from-[#e3c47e] via-[#f4e2be] to-[#cf9f46] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Reserving Private Suite...</span>
                  </span>
                ) : (
                  <>
                    <span>Confirm Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#9c907f] pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Complimentary 24h Rescheduling</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Dedicated Private Concierge</span>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
