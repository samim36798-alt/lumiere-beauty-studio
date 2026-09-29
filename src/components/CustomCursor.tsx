import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop mouse devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('.cursor-pointer') ||
          target.closest('.cursor-ew-resize') ||
          target.closest('.cursor-grab'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing follower loop
    let animId: number;
    const animate = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central precise dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#d4af37] pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-screen"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      />
      {/* Outer elegant golden ring with magnetic expansion */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 border border-[#d4af37]/60 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          isHovering
            ? 'w-11 h-11 bg-[#d4af37]/15 border-[#d4af37] scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            : 'w-7 h-7 bg-transparent opacity-60'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (isHovering ? 22 : 14)}px, ${
            trailingPos.y - (isHovering ? 22 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
};
