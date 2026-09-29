import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 700);
          }, 300);
          return 100;
        }
        // Smooth non-linear progress
        const increment = Math.max(1, Math.floor(Math.random() * 8) + 2);
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090807] transition-opacity duration-700 pointer-events-auto ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle background ambient golden light */}
      <div className="absolute w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Brand Monogram / Sparkle */}
        <div className="text-[11px] font-mono tracking-[0.35em] text-[#d4af37] uppercase mb-4 opacity-80">
          HAUTE BEAUTÉ ATELIER
        </div>

        {/* Brand Title */}
        <h1 className="text-4xl sm:text-5xl font-serif tracking-[0.25em] text-[#fcf9f2] uppercase">
          LUMIÈRE
        </h1>
        <div className="text-[10px] tracking-[0.45em] text-[#a39886] uppercase mt-1">
          PARIS · MILANO · BEVERLY HILLS
        </div>

        {/* Animated Golden Line Loader */}
        <div className="w-56 h-[1.5px] bg-[#29231c] mt-8 relative overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#b58d3d] via-[#f3e5cb] to-[#d4af37] shadow-[0_0_12px_#d4af37] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Counter */}
        <div className="mt-4 text-xs font-mono text-[#d4af37] tracking-widest tabular-nums">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
};
