import React, { useState, useRef } from 'react';
import { salonArtists } from '../data/salonData';
import { Artist } from '../types';
import { Sparkles, ChevronLeft, ChevronRight, Instagram, Award, Calendar, X, CheckCircle } from 'lucide-react';

interface ArtistsProps {
  onBookWithArtist: (artistName: string) => void;
}

export const Artists: React.FC<ArtistsProps> = ({ onBookWithArtist }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="artists" className="py-28 bg-[#0a0807] relative overflow-hidden border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Carousel Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Couture Maestros</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
              Our Beauty <span className="gold-gradient-text italic">Artists.</span>
            </h2>
            <p className="mt-3 text-[#bfb5a3] text-sm sm:text-base max-w-xl">
              Meet our master coiffeurs, color chemists, and skin therapists hailing from Paris, London, Milan, and Tokyo.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous artist"
              className="p-3 rounded-full luxury-glass border border-[#d4af37]/30 text-[#ded2be] hover:text-white hover:border-[#d4af37] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next artist"
              className="p-3 rounded-full luxury-glass border border-[#d4af37]/30 text-[#ded2be] hover:text-white hover:border-[#d4af37] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-7 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {salonArtists.map((artist) => (
            <div
              key={artist.id}
              className="min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-start rounded-2xl overflow-hidden bg-[#14100e] border border-[#d4af37]/20 transition-all duration-500 hover:border-[#d4af37]/50 group flex flex-col justify-between"
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1c1815]">
                <img
                  src={artist.image}
                  alt={artist.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100e] via-black/20 to-transparent" />

                {/* Social Icon */}
                <a
                  href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2 rounded-full luxury-glass text-[#e5dec9] hover:text-[#d4af37] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* Experience Tag */}
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-md luxury-glass text-[11px] font-mono text-[#d4af37] border border-[#d4af37]/30">
                  {artist.experience}
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-serif text-white tracking-wide">{artist.name}</h3>
                  <div className="text-xs text-[#d4af37] font-medium mt-0.5">{artist.title}</div>
                  <div className="text-xs text-[#a89b88] mt-2 font-mono">{artist.specialization}</div>
                </div>

                <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArtist(artist)}
                    className="text-xs font-semibold text-[#ded2be] hover:text-[#d4af37] transition-colors underline underline-offset-4"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => onBookWithArtist(artist.name)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#c99b3b] transition-all"
                  >
                    Book Artist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artist Profile Lightbox Modal */}
      {selectedArtist && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedArtist(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#14100e] border border-[#d4af37]/35 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 p-2 text-[#b0a490] hover:text-white rounded-full luxury-glass"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 aspect-[3/4] rounded-xl overflow-hidden border border-[#d4af37]/25">
                <img
                  src={selectedArtist.image}
                  alt={selectedArtist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-4">
                <div>
                  <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider">
                    {selectedArtist.specialization}
                  </div>
                  <h3 className="text-2xl font-serif text-white">{selectedArtist.name}</h3>
                  <div className="text-xs text-[#cfc19f] mt-1">{selectedArtist.title}</div>
                </div>

                <p className="text-xs sm:text-sm text-[#bfb39f] leading-relaxed">
                  {selectedArtist.bio}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#d4af37]/15">
                  <div className="text-[11px] font-mono text-[#8a7f70] uppercase">Accolades & Features</div>
                  {selectedArtist.awards.map((award, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#ebd8b7]">
                      <Award className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const name = selectedArtist.name;
                      setSelectedArtist(null);
                      onBookWithArtist(name);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#d4af37] text-black font-semibold text-xs text-center hover:bg-[#c99b3b] shadow-lg transition-all"
                  >
                    Reserve Consultation With {selectedArtist.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
