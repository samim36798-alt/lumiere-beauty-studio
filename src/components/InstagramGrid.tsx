import React from 'react';
import { instagramPosts } from '../data/salonData';
import { Instagram, Heart, MessageCircle, Sparkles } from 'lucide-react';

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#090807] relative overflow-hidden border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>@LUMIERE.BEAUTYSTUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
              Follow The <span className="gold-gradient-text italic">Glow.</span>
            </h2>
            <p className="mt-2 text-[#bfb5a3] text-sm">
              Daily inspiration, backstage couture styling, and beauty insights from our studio.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full luxury-glass border border-[#d4af37]/30 text-xs font-semibold text-[#ded2be] hover:text-white hover:border-[#d4af37] transition-all"
          >
            <Instagram className="w-4 h-4 text-[#d4af37]" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        {/* 6 Post Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#14100e] border border-[#d4af37]/20 cursor-pointer"
            >
              <img
                src={post.image}
                alt="Instagram post"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover overlay with likes & comments */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="text-[10px] font-mono text-[#d4af37] truncate">
                  {post.handle}
                </div>

                <p className="text-[11px] text-white/90 line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#eedec0] pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{post.comments}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
