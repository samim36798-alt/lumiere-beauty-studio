import React, { useState, useRef } from 'react';
import { beforeAfterItems } from '../data/salonData';
import { Sparkles, MoveHorizontal, CheckCircle2, ArrowRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  onBookService?: (serviceName: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onBookService }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = beforeAfterItems[activeItemIndex];

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPosition(percentage);
  };

  return (
    <section id="before-after" className="py-28 bg-[#0e0c0a] relative overflow-hidden border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Visible Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
              The Art of <span className="gold-gradient-text italic">Metamorphosis.</span>
            </h2>
            <p className="mt-3 text-[#bfb5a3] text-sm sm:text-base max-w-xl">
              Witness the harmonious union of bone structure assessment, master coloration, and restorative silk treatments.
            </p>
          </div>

          {/* Transformation Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 p-1.5 luxury-glass rounded-xl border border-[#d4af37]/25">
            {beforeAfterItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItemIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  activeItemIndex === idx
                    ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'text-[#d6cbb8] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Comparison Slider Box (Left 8 cols) */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerMove={handlePointerMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]/30 select-none cursor-ew-resize group bg-[#16120e]"
            >
              {/* "AFTER" Image (Full background layer) */}
              <img
                src={currentItem.afterImage}
                alt={`${currentItem.title} After`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* "BEFORE" Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentItem.beforeImage}
                  alt={`${currentItem.title} Before`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                />
                {/* Before Scrim badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/75 backdrop-blur-md rounded-md text-[11px] font-mono tracking-wider text-[#d4af37] border border-[#d4af37]/30">
                  BEFORE TRANSFORMATION
                </div>
              </div>

              {/* After Scrim badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/75 backdrop-blur-md rounded-md text-[11px] font-mono tracking-wider text-[#d4af37] border border-[#d4af37]/30">
                AFTER LUMIÈRE
              </div>

              {/* Interactive Divider Line with Golden Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#d4af37] shadow-[0_0_15px_#d4af37] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0c0a09] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.6)] flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                  <MoveHorizontal className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Bottom Instructions helper */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full luxury-glass text-[11px] text-[#ebe0cb] pointer-events-none flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Drag handle horizontally to inspect transformation</span>
              </div>
            </div>
          </div>

          {/* Transformation Story Details (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            <div className="luxury-glass p-6 sm:p-7 rounded-2xl border border-[#d4af37]/25 space-y-4">
              <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider">
                Case Study · {currentItem.category}
              </div>

              <h3 className="text-2xl font-serif text-white tracking-wide leading-tight">
                {currentItem.title}
              </h3>

              <p className="text-sm text-[#bfb5a3] leading-relaxed">
                {currentItem.description}
              </p>

              <div className="pt-3 border-t border-[#d4af37]/15 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#e0cfab]">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Ammonia-free French botanical toner formula</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#e0cfab]">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Caviar lipid bond reconstruction seal</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#e0cfab]">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Designed to last 16+ weeks with zero brass</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#9a9081] uppercase font-mono">Master Artisan</div>
                  <div className="text-sm font-medium text-white">{currentItem.artist}</div>
                </div>

                <button
                  onClick={() => onBookService && onBookService(currentItem.category)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#d4af37] hover:bg-[#c99b3b] text-black font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all"
                >
                  <span>Book Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Client feedback quote */}
            <div className="p-4 rounded-xl luxury-glass-light border border-white/5">
              <p className="text-xs italic text-[#cfc2a8] leading-relaxed">
                “My hair had never felt this soft even when virgin. Camille’s placement of light frames my cheekbones perfectly.”
              </p>
              <div className="mt-2 text-[11px] font-mono text-[#d4af37]">Verified Lumière Transformation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
