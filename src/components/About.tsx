import React, { useEffect, useRef, useState } from 'react';
import { salonAssets, salonStats } from '../data/salonData';
import { Sparkles, Award, Compass, HeartHandshake } from 'lucide-react';

export const About: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(salonStats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1800;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            setCounts(
              salonStats.map((stat) => {
                const progress = Math.min(1, currentStep / steps);
                // easeOutQuad
                const ease = 1 - (1 - progress) * (1 - progress);
                return Math.round(stat.value * ease);
              })
            );

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts(salonStats.map((s) => s.value));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 bg-[#0a0807] relative overflow-hidden border-t border-[#d4af37]/15"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Top Editorial Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Heading & Manifesto (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>THE LUMIÈRE MANIFESTO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#fbf8f3] tracking-tight leading-[1.12]">
              More Than <br />
              <span className="gold-gradient-text italic font-normal">A Salon.</span>
            </h2>

            <p className="text-lg text-[#ded3c1] font-light leading-relaxed">
              LUMIÈRE BEAUTY STUDIO is a modern beauty destination where expert artistry, premium products and personalized experiences come together.
            </p>

            <p className="text-sm text-[#ada18e] leading-relaxed">
              Founded on the belief that beauty is an individual architecture, our master artisans blend timeless European technique with state-of-the-art scalp diagnostics, organic botanical formulations, and custom color chemistry.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl luxury-glass border border-white/5">
                <Award className="w-5 h-5 text-[#d4af37] mb-2" />
                <h4 className="text-sm font-semibold text-white">Curated Artistry</h4>
                <p className="text-xs text-[#a39785] mt-1">Each stylist is an internationally trained master colorist or couture cutter.</p>
              </div>

              <div className="p-4 rounded-xl luxury-glass border border-white/5">
                <HeartHandshake className="w-5 h-5 text-[#d4af37] mb-2" />
                <h4 className="text-sm font-semibold text-white">Private Sanctuary</h4>
                <p className="text-xs text-[#a39785] mt-1">Personalized acoustic suites, champagne hospitality, and bespoke care.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dual Editorial Images Composition (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 sm:gap-6 relative">
            {/* Salon Interior Lounge (Landscape, offset) */}
            <div className="col-span-8 overflow-hidden rounded-2xl border border-[#d4af37]/25 shadow-2xl group relative aspect-[4/3]">
              <img
                src={salonAssets.lounge}
                alt="Lumière Sanctuary Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-[#d4af37] uppercase">
                Avenue Montaigne Atelier
              </div>
            </div>

            {/* Master Beauty Professional (Vertical Portrait, overlapping) */}
            <div className="col-span-4 -mt-6 sm:-mt-10 overflow-hidden rounded-2xl border border-[#d4af37]/40 shadow-2xl group relative aspect-[3/4]">
              <img
                src={salonAssets.masterStylist}
                alt="Master Artisan at Work"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-white">
                Julian de Vane
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics Counter Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#d4af37]/20">
          {salonStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl luxury-glass border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight tabular-nums">
                <span className="gold-gradient-text font-bold">
                  {counts[idx]}
                </span>
                <span className="text-[#d4af37]">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-[#c4b69f] tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
