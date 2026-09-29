import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Sparkles, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0807] relative overflow-hidden border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Locations & Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
            Find <span className="gold-gradient-text italic">Lumière.</span>
          </h2>
          <p className="mt-3 text-[#bfb5a3] text-sm sm:text-base">
            Private sanctuary located on Avenue Montaigne with discrete valet service and chauffeur reception.
          </p>
        </div>

        {/* Content Grid: Contact Details (5 cols) + Dark Styled Map (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 luxury-glass p-8 sm:p-10 rounded-3xl border border-[#d4af37]/25 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif text-white">Flagship Atelier</h4>
                  <p className="text-xs text-[#bfb39f] mt-1 leading-relaxed">
                    842 Avenue Montaigne, 8ème Arrondissement<br />
                    75008 Paris, France
                  </p>
                  <span className="text-[11px] font-mono text-[#d4af37] mt-1 block">
                    Private entrance via Cour d’Honneur
                  </span>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif text-white">Opening Hours</h4>
                  <p className="text-xs text-[#bfb39f] mt-1">
                    <strong className="text-white font-medium">Monday – Sunday</strong><br />
                    10:00 AM – 9:00 PM
                  </p>
                  <span className="text-[11px] font-mono text-[#a39785] mt-1 block">
                    Private after-hours appointments available upon request
                  </span>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif text-white">Telephone Concierge</h4>
                  <p className="text-xs text-[#bfb39f] mt-1">
                    <a href="tel:+33142685900" className="hover:text-[#d4af37] transition-colors">
                      +33 1 42 68 59 00 (Paris)
                    </a><br />
                    <a href="tel:+13108927400" className="hover:text-[#d4af37] transition-colors">
                      +1 (310) 892-7400 (Beverly Hills)
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif text-white">Client Inquiries</h4>
                  <p className="text-xs text-[#bfb39f] mt-1">
                    <a href="mailto:concierge@lumiere-beautystudio.com" className="hover:text-[#d4af37] transition-colors">
                      concierge@lumiere-beautystudio.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Concierge Direct Action */}
            <div className="pt-4 border-t border-[#d4af37]/15">
              <a
                href="https://wa.me/33142685900?text=Hello%20Lumi%C3%A8re%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20suite%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#55ea8b] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat via WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Area (Dark Luxury Cartography Presentation) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#d4af37]/25 relative bg-[#120f0d] flex flex-col justify-between shadow-2xl min-h-[420px]">
            {/* Visual map preview / embed placeholder styled with luxury dark cartography */}
            <div className="absolute inset-0 z-0">
              <iframe
                title="Lumière Studio Paris Location"
                src="https://maps.google.com/maps?q=Avenue+Montaigne+Paris&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert-[93%] hue-rotate-180 contrast-[1.2] opacity-75"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0c0a09]/30 pointer-events-none" />
            </div>

            {/* Floating Location Overlay Card */}
            <div className="relative z-10 p-6 m-4 max-w-sm luxury-glass rounded-2xl border border-[#d4af37]/40 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#d4af37]">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                <span>Now Welcoming Guests</span>
              </div>
              <h4 className="text-lg font-serif text-white mt-1">LUMIÈRE PARIS ATELIER</h4>
              <p className="text-xs text-[#c4b69f] mt-1">
                Steps from Plaza Athénée & Christian Dior flagship. Valet parking on Rue François 1er.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=842+Avenue+Montaigne+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:underline font-semibold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Chauffeur Directions</span>
                </a>
              </div>
            </div>

            {/* Bottom status strip */}
            <div className="relative z-10 m-4 px-4 py-2 luxury-glass rounded-xl border border-white/10 text-xs text-[#ded2be] flex items-center justify-between pointer-events-none">
              <span>Valet Parking & Chauffeur Staging Ready</span>
              <span className="text-[#d4af37] font-mono text-[11px]">842 AVE MONTAIGNE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
