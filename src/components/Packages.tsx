import React, { useState } from 'react';
import { salonPackages } from '../data/salonData';
import { Sparkles, Check, ArrowRight, Crown, Star } from 'lucide-react';

interface PackagesProps {
  onBookPackage: (packageName: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onBookPackage }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="packages" className="py-28 bg-[#090807] relative overflow-hidden border-t border-[#d4af37]/15">
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#d4af37]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Curated Rituals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
            Premium <span className="gold-gradient-text italic">Packages.</span>
          </h2>
          <p className="mt-4 text-[#bfb5a3] text-sm sm:text-base leading-relaxed">
            Immerse yourself in our all-inclusive beauty sanctuaries. Each experience is crafted for seamless elegance, restorative calm, and radiant confidence.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {salonPackages.map((pkg) => {
            const isRec = pkg.recommended;
            const isHovered = hoveredId === pkg.id;

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setHoveredId(pkg.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 ${
                  isRec
                    ? 'bg-gradient-to-b from-[#1c1712] via-[#14100e] to-[#0f0c0a] border-2 border-[#d4af37] shadow-[0_15px_50px_rgba(212,175,55,0.25)] lg:-translate-y-4'
                    : 'bg-[#14100d] border border-[#d4af37]/20 hover:border-[#d4af37]/45 hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
                }`}
                style={{
                  transform: isHovered
                    ? isRec
                      ? 'translateY(-20px) scale(1.02)'
                      : 'translateY(-8px) scale(1.01)'
                    : isRec
                    ? 'translateY(-16px)'
                    : 'none',
                }}
              >
                {/* Recommended Badge on Middle Package */}
                {isRec && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e4bf] to-[#c99b3b] text-black font-semibold text-[11px] uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Most Requested</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#d4af37]">
                      {pkg.duration}
                    </span>
                    {isRec ? (
                      <div className="p-2 rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                        <Star className="w-4 h-4 fill-[#d4af37]" />
                      </div>
                    ) : null}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif text-white mt-3">
                    {pkg.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#b3a693] leading-relaxed min-h-[36px]">
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-6 pb-6 border-b border-[#d4af37]/15 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-serif text-white tabular-nums">
                      ${pkg.price}
                    </span>
                    <span className="text-xs text-[#968a7a] font-mono uppercase tracking-wider">
                      / Complete Session
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#998c7b]">
                      Included in this ritual:
                    </div>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs text-[#ded2bc] leading-relaxed">
                        <div className="p-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] mt-0.5 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-8 mt-6">
                  <button
                    onClick={() => onBookPackage(pkg.name)}
                    className={`w-full py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                      isRec
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#f5e4bf] to-[#c99b3b] text-black shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]'
                        : 'bg-white/10 hover:bg-[#d4af37] text-white hover:text-black border border-white/10 hover:border-transparent'
                    }`}
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
