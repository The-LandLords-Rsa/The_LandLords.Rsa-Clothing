import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX, ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onLookbookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick, onLookbookClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div id="hero" className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-900">
      {/* Video Background Layer */}
      <div className="relative h-[78vh] min-h-[580px] max-h-[820px] w-full flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 brightness-75 scale-105"
        >
          <source
            src="/brand-assets/Clothing_website__Inspo__WhatsApp_Video_2026-09-11_at_15.21.10.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/30 to-neutral-950/80" />

        {/* Top Sound Control */}
        <div className="absolute top-6 right-6 z-20">
          <button
            id="hero-sound-toggle"
            onClick={toggleSound}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 text-xs tracking-wider text-neutral-300 hover:text-white hover:border-neutral-500 transition-all shadow-lg"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">SOUND ON</span>
              </>
            )}
          </button>
        </div>

        {/* Central Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>South African Luxury Streetwear</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-50 uppercase leading-none mb-6">
            THE LANDLORDS <span className="text-amber-400">RSA</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8">
            Architectural silhouettes, 480GSM heavyweight combed cotton, and unapologetic South African urban culture.
            Explore the flagship <span className="text-white font-medium">Mansion Affairs</span>,{' '}
            <span className="text-white font-medium">Love, Hoops & Dreams</span>, and{' '}
            <span className="text-white font-medium">Angel Kind</span> drops.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-shop-btn"
              onClick={onShopClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 text-neutral-950 font-bold text-sm tracking-wider uppercase hover:bg-amber-300 transition-all transform active:scale-95 shadow-xl shadow-amber-400/10"
            >
              Shop Latest Garments
            </button>
            <button
              id="hero-film-btn"
              onClick={onLookbookClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 font-bold text-sm tracking-wider uppercase transition-all backdrop-blur-sm"
            >
              Watch Campaign Film
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center text-neutral-500 text-xs tracking-widest uppercase">
          <span className="mb-1 text-[10px]">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </div>
      </div>

      {/* Feature Ticker Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-neutral-800 bg-neutral-900/60 divide-y md:divide-y-0 md:divide-x divide-neutral-800/80">
        <div className="p-4 sm:p-5 flex items-center justify-center gap-3 text-center sm:text-left">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">480GSM Heavyweight</div>
            <div className="text-[11px] text-neutral-400">Pure combed French terry</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center justify-center gap-3 text-center sm:text-left">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">Nationwide Delivery</div>
            <div className="text-[11px] text-neutral-400">Paxi & Courier Guy across RSA</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center justify-center gap-3 text-center sm:text-left">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">Bespoke Silhouettes</div>
            <div className="text-[11px] text-neutral-400">Drop shoulder & cropped cuts</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-center justify-center gap-3 text-center sm:text-left">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">Direct WhatsApp Order</div>
            <div className="text-[11px] text-neutral-400">Instant customer concierge</div>
          </div>
        </div>
      </div>
    </div>
  );
};
