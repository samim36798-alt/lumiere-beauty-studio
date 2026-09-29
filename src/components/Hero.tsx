import React, { useState, useEffect } from 'react';
import { salonAssets } from '../data/salonData';
import { Hero3DObject } from './Hero3DObject';
import { Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 18;
      const y = (e.clientY / innerHeight - 0.5) * 18;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0a09] pt-24 pb-16"
    >
      {/* Cinematic Background Layer with Parallax Mouse Shift & Subtle Slow Zoom */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden scale-105 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0) scale(1.04)`,
        }}
      >
        <img
          src={salonAssets.hero}
          alt="Lumière Haute Beauty Studio Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.12]"
        />
        {/* Measured Luxury Gradient Scrims (Anti-Washout) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/60 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_75%)]" />
      </div>

      {/* Floating Golden Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#f4e2be] blur-[1px] animate-pulse opacity-60" />
        <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-[#d4af37] blur-[1.5px] animate-bounce opacity-40 duration-1000" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-[#deb852] opacity-70" />
        <div className="absolute bottom-1/4 right-1/6 w-2.5 h-2.5 rounded-full bg-[#f3e5cb] blur-[2px] opacity-30 animate-pulse" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Typography & Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          {/* Atelier Trust Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full luxury-glass border border-[#d4af37]/30 text-xs text-[#eedec0] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" />
            <span className="font-mono text-[11px]">PARISIAN HAUTE COIFFURE & SPA</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#fbf8f3] tracking-tight leading-[1.08]">
            Beauty, <br />
            <span className="gold-gradient-text italic font-normal">Redefined.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#ded4c3] font-light max-w-xl leading-relaxed">
            Where modern artistry meets timeless elegance. Experience bespoke hair sculpting, dimensional balayage, and restorative cellular spa rituals in an atmosphere of private luxury.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#e3c47e] via-[#f4e2be] to-[#cf9f46] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#services"
              className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#ded2be] hover:text-white luxury-glass hover:border-[#d4af37]/50 transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Services</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 border-t border-[#d4af37]/20 flex flex-wrap items-center gap-8 sm:gap-12">
            <div>
              <div className="text-2xl font-serif text-white tabular-nums">4.98<span className="text-[#d4af37] text-lg">★</span></div>
              <div className="text-[11px] font-mono text-[#a89d8d] uppercase tracking-wider">Over 2,400+ 5-Star Reviews</div>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

            <div>
              <div className="text-2xl font-serif text-white tabular-nums">100<span className="text-[#d4af37] text-lg">%</span></div>
              <div className="text-[11px] font-mono text-[#a89d8d] uppercase tracking-wider">Organic Restorative Toners</div>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

            <div>
              <div className="text-2xl font-serif text-white">Private</div>
              <div className="text-[11px] font-mono text-[#a89d8d] uppercase tracking-wider">VIP Styling Suites</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Beauty Object Stage (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <Hero3DObject className="w-full max-w-md mx-auto" />
        </div>
      </div>

      {/* Bottom Scroll Indicator Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
        <a href="#about" className="flex flex-col items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-[#cfc2aa]">
          <span>SCROLL TO DISCOVER</span>
          <div className="w-4 h-7 rounded-full border border-[#d4af37]/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#d4af37] animate-pulse" />
          </div>
        </a>
      </div>
    </section>
  );
};
