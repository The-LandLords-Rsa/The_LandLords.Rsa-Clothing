import React, { useEffect, useState } from 'react';

interface Y2KLoadingScreenProps {
  onComplete: () => void;
}

export const Y2KLoadingScreen: React.FC<Y2KLoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Logo fade-in
    const t1 = setTimeout(() => setPhase(2), 600);
    // Phase 2: "RENT IS DUE." appears
    const t2 = setTimeout(() => setPhase(3), 1200);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    // Phase 4: Complete and fade into site
    const t3 = setTimeout(() => {
      setPhase(4);
      setTimeout(onComplete, 400);
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 transition-opacity duration-500 select-none ${
        phase === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle CRT / scanlines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

      {/* Atmospheric center glow */}
      <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Brand Monogram */}
        <div
          className={`w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-2xl font-black tracking-tighter text-amber-400 mb-6 shadow-2xl transition-all duration-700 ${
            phase >= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          LL
        </div>

        {/* Brand Name */}
        <h1
          className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-[0.25em] text-neutral-100 mb-2 transition-all duration-700 ${
            phase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          The LandLords
        </h1>

        {/* Brand Slogan */}
        <div
          className={`text-sm sm:text-base font-mono font-bold tracking-[0.3em] uppercase text-amber-400 mb-8 transition-all duration-700 ${
            phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          RENT IS DUE.
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 sm:w-56 h-1 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-amber-400 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between w-48 sm:w-56 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <span>Y2K / RSA</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
