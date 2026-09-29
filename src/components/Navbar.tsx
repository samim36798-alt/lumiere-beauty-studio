import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Artists', href: '#artists' },
    { label: 'Transformations', href: '#before-after' },
    { label: 'Packages', href: '#packages' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at the top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#f7e7c8] to-[#b58d3d] shadow-[0_0_8px_#d4af37]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#0c0a09]/85 backdrop-blur-xl border-b border-[#d4af37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Wordmark (Single text element) */}
          <a
            href="#home"
            className="group flex flex-col items-start select-none"
          >
            <span className="text-xl sm:text-2xl font-serif tracking-[0.22em] text-[#faf6ee] uppercase group-hover:text-[#d4af37] transition-colors duration-300">
              LUMIÈRE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-xs tracking-wider uppercase font-medium text-[#d9ceb9] hover:text-white transition-colors duration-200 py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#e3c47e] via-[#f4e2be] to-[#cf9f46] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300 whitespace-nowrap active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden p-2 rounded-lg text-[#ded2be] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl transition-opacity duration-300 xl:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-[#120f0d] border-l border-[#d4af37]/25 p-7 flex flex-col justify-between transition-transform duration-300 ease-out shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-xl font-serif tracking-[0.2em] text-[#faf6ee] uppercase">
                LUMIÈRE
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#beb29d] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider text-[#d9ceb9] hover:text-[#d4af37] transition-colors py-1.5 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <a
              href="tel:+13108927400"
              className="w-full py-2.5 rounded-xl luxury-glass text-[#ded2be] hover:text-white text-xs tracking-wider text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Direct Concierge: +1 (310) 892-7400</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
