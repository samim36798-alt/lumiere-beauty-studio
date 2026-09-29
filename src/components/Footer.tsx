import React, { useState } from 'react';
import { Sparkles, ArrowRight, Instagram, Facebook, Youtube, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-[#070605] text-[#d6cab6] pt-16 pb-12 overflow-hidden">
      {/* Subtle animated glowing gold line above footer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_15px_#d4af37] animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Newsletter / Editorial Invitation */}
        <div className="luxury-glass p-8 sm:p-12 rounded-3xl border border-[#d4af37]/25 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              L’Édition Privée
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              Receive Private Seasonal Invitations
            </h3>
            <p className="text-xs sm:text-sm text-[#baa995] max-w-lg leading-relaxed">
              Curated coiffure lookbooks, private salon events, and priority holiday reservations dispatched bi-monthly.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] text-white text-xs">
                <Check className="w-4 h-4 text-[#d4af37]" />
                <span>Merci. You have been added to our private register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c99b3b] text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-2xl font-serif tracking-[0.2em] text-[#faf6ee] uppercase block">
              LUMIÈRE
            </span>
            <p className="text-xs text-[#a89b88] leading-relaxed max-w-sm">
              Lumière Beauty Studio is an international haute coiffure sanctuary and cellular rejuvenation retreat. Where Parisian precision meets bespoke modern luxury.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full luxury-glass hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full luxury-glass hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full luxury-glass hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Atelier</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services Menu</a></li>
              <li><a href="#artists" className="hover:text-white transition-colors">Our Artists</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Ritual Packages</a></li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">Signature Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Couture Hair Styling & Balayage</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">24K Gold Cellular Facial</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Couture Bridal Makeup</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Russian Cashmere Manicure</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Caviar Scalp & Hair Spa</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Gentlemen’s Royal Shave</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">Atelier Concierge</h4>
            <p className="text-xs text-[#a89b88] leading-relaxed">
              842 Avenue Montaigne, 75008 Paris<br />
              Mon – Sun: 10:00 AM – 9:00 PM<br />
              concierge@lumiere-beautystudio.com<br />
              +33 1 42 68 59 00
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#85796b] gap-4">
          <p>© {new Date().getFullYear()} Lumière Beauty Studio Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-[#d4af37] transition-colors">Terms & Conditions</a>
            <span>·</span>
            <a href="#accessibility" className="hover:text-[#d4af37] transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
