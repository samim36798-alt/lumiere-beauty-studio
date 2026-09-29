import React, { useState } from 'react';
import { galleryPhotos } from '../data/salonData';
import { GalleryPhoto } from '../types';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Showcase' },
    { id: 'interior', label: 'Salon Interior' },
    { id: 'hair', label: 'Hair Styling & Color' },
    { id: 'bridal', label: 'Bridal & Makeup' },
    { id: 'nails', label: 'Nail Couture' },
  ];

  const filteredPhotos =
    activeFilter === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeFilter);

  const openLightbox = (index: number) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="py-28 bg-[#0c0a09] relative overflow-hidden border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Cinematic Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
            The Haute <span className="gold-gradient-text italic">Gallery.</span>
          </h2>
          <p className="mt-4 text-[#bfb5a3] text-sm sm:text-base leading-relaxed">
            Moments captured inside our ateliers: from runway preparation and delicate bridal veil pins to organic botanical alchemy.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 luxury-glass rounded-full border border-[#d4af37]/25 max-w-xl mx-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-[#ded2be] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {filteredPhotos.map((photo, idx) => {
            const isLandscape = photo.aspect === 'landscape';
            const isPortrait = photo.aspect === 'portrait';

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#14100e] border border-[#d4af37]/20 transition-all duration-500 hover:border-[#d4af37]/60 hover:shadow-[0_10px_35px_rgba(212,175,55,0.2)] ${
                  isLandscape ? 'sm:col-span-2' : ''
                } ${isPortrait ? 'row-span-2' : ''}`}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.88] group-hover:brightness-100"
                />

                {/* Dark Hover Overlay with Category and View Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] luxury-glass px-2.5 py-1 rounded-md border border-[#d4af37]/30">
                      {photo.category}
                    </span>
                    <div className="p-2 rounded-full bg-black/60 text-white luxury-glass">
                      <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-serif text-white tracking-wide">{photo.title}</h4>
                    <span className="text-xs text-[#cfc2aa] mt-1 inline-flex items-center gap-1.5 font-medium">
                      <span>Inspect High Resolution</span>
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full luxury-glass text-white hover:text-[#d4af37] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full luxury-glass text-white hover:text-[#d4af37] transition-colors hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full luxury-glass text-white hover:text-[#d4af37] transition-colors hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Showcase Card */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[selectedPhotoIndex].image}
              alt={filteredPhotos[selectedPhotoIndex].title}
              className="max-w-full max-h-[72vh] object-contain rounded-xl border border-[#d4af37]/30 shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest">
                {filteredPhotos[selectedPhotoIndex].category} · LUMIÈRE COLLECTION
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
                {filteredPhotos[selectedPhotoIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
