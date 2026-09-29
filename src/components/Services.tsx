import React, { useState } from 'react';
import { salonServices } from '../data/salonData';
import { ServiceItem } from '../types';
import { Sparkles, ArrowRight, Clock, Star } from 'lucide-react';

interface ServicesProps {
  onBookService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Haute Hair & Color' },
    { id: 'spa', label: 'Skin & Spa Therapies' },
    { id: 'bridal', label: 'Bridal & Makeup' },
    { id: 'nails', label: 'Nail Couturière' },
    { id: 'grooming', label: 'Gentlemen’s Grooming' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? salonServices
      : salonServices.filter((s) => {
          if (activeCategory === 'bridal') {
            return s.category === 'bridal' || s.category === 'makeup';
          }
          return s.category === activeCategory;
        });

  return (
    <section id="services" className="py-28 bg-[#0c0a09] relative overflow-hidden border-t border-[#d4af37]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#d4af37]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#9c782b]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Curated Menu of Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
            Artistry & <span className="gold-gradient-text italic">Rejuvenation.</span>
          </h2>
          <p className="mt-4 text-[#bfb5a3] text-sm sm:text-base leading-relaxed">
            Every ritual begins with a personalized consultation, followed by execution using ammonia-free botanical formulas, precious metals, and precision European technique.
          </p>

          {/* Category Filter Pills (Functional buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 luxury-glass rounded-full border border-[#d4af37]/25 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-[#d6cab6] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Services Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl overflow-hidden bg-[#14100d] border border-[#d4af37]/20 transition-all duration-500 hover:-translate-y-2 hover:border-[#d4af37]/50 hover:shadow-[0_12px_40px_rgba(212,175,55,0.18)] flex flex-col justify-between"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1c1815]">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-transparent to-black/30" />

                {/* Popularity Badge if marked */}
                {service.popular && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full luxury-glass border border-[#d4af37]/40 text-[10px] font-mono text-[#d4af37] uppercase flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#d4af37]" />
                    <span>Signature</span>
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#ebd8b7] font-medium drop-shadow-md">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Card Content & Price */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-serif text-[#fcf9f2] group-hover:text-[#d4af37] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#b8ab97] leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d4af37]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#918575] uppercase font-mono tracking-wider block">
                      Starting from
                    </span>
                    <span className="text-xl font-serif text-white tabular-nums">
                      ${service.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookService(service.name)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#c99b3b] shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-all duration-300 active:scale-95"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subtle top gold hairline on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
