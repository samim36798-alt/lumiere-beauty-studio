import React, { useState } from 'react';
import { clientReviews } from '../data/salonData';
import { Sparkles, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + clientReviews.length) % clientReviews.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % clientReviews.length);
  };

  const current = clientReviews[currentIndex];

  return (
    <section id="reviews" className="py-28 bg-[#0c0a09] relative overflow-hidden border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Client Acclaim</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
            Words of <span className="gold-gradient-text italic">Devotion.</span>
          </h2>
          <p className="mt-3 text-[#bfb5a3] text-sm sm:text-base">
            From Paris fashion editors to brides and discreet private clients.
          </p>
        </div>

        {/* Testimonial Spotlight Showcase */}
        <div className="max-w-4xl mx-auto relative">
          <div className="luxury-glass p-8 sm:p-12 md:p-14 rounded-3xl border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
            {/* Large subtle quote glyph in background */}
            <Quote className="absolute -bottom-4 -right-4 w-40 h-40 text-white/[0.03] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
              {/* Client Portrait */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <img
                    src={current.image}
                    alt={current.clientName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-[#d4af37] text-black font-mono text-[10px] font-bold">
                  5.0 ★
                </div>
              </div>

              {/* Review Text & Author */}
              <div className="space-y-4 text-center md:text-left">
                {/* 5 Stars */}
                <div className="flex items-center justify-center md:justify-start gap-1 text-[#d4af37]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                  ))}
                </div>

                <p className="text-base sm:text-lg md:text-xl font-serif text-[#f5efe6] italic leading-relaxed">
                  “{current.comment}”
                </p>

                <div className="pt-2">
                  <div className="text-base font-serif text-white tracking-wide">
                    {current.clientName}
                  </div>
                  <div className="text-xs text-[#a39785]">
                    {current.role} · <span className="text-[#d4af37]">{current.service}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel navigation controls at bottom */}
            <div className="mt-8 pt-6 border-t border-[#d4af37]/15 flex items-center justify-between">
              <div className="text-xs font-mono text-[#998b7a] tracking-wider">
                0{currentIndex + 1} / 0{clientReviews.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="p-2.5 rounded-full luxury-glass border border-[#d4af37]/25 text-[#ded2be] hover:text-white hover:border-[#d4af37] transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="p-2.5 rounded-full luxury-glass border border-[#d4af37]/25 text-[#ded2be] hover:text-white hover:border-[#d4af37] transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
