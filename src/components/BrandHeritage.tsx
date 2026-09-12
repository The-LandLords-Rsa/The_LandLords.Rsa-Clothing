import React from 'react';
import { Layers, ShieldCheck, Compass, Sparkles } from 'lucide-react';

interface BrandHeritageProps {
  onExploreProducts?: () => void;
}

export const BrandHeritage: React.FC<BrandHeritageProps> = ({ onExploreProducts }) => {
  return (
    <section id="about" className="py-24 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-neutral-700/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Atelier Manifesto</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-neutral-50 tracking-wide leading-tight mb-6">
              OWN THE SPACE. <br />
              <span className="text-amber-400">UNCOMPROMISING RSA LUXURY.</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              Born from South African street culture, <strong>The LandLords RSA</strong> redefines urban high fashion through monolithic proportions, heavyweight textiles, and uncompromising attention to garment anatomy.
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed font-light mb-8">
              We do not produce disposable fast-fashion. Every hoodie, t-shirt, and tailored trouser is engineered with 100% heavy carded cotton, double-needle reinforcement, and precision screen-printing designed to age gracefully with every wear.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-800 mb-8">
              <div>
                <div className="font-display text-3xl font-extrabold text-white">480<span className="text-amber-400 text-lg">GSM</span></div>
                <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Heaviest French Terry Weave</div>
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-white">100<span className="text-amber-400 text-lg">%</span></div>
                <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">South African Street Identity</div>
              </div>
            </div>

            {onExploreProducts && (
              <button
                id="about-explore-products-btn"
                onClick={onExploreProducts}
                className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-400/10 flex items-center gap-2"
              >
                <span>Explore Products & Capsules</span>
                <span>→</span>
              </button>
            )}
          </div>

          {/* Heritage Graphic Presentation */}
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl p-4 flex items-center justify-center">
            <img
              src="/brand-assets/Clothing_website__Logo__The_LandLords_rsa__Logo_s_.jpg"
              alt="The LandLords RSA Seal"
              className="w-full h-full object-cover rounded-2xl opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block mb-1">
                Johannesburg Atelier
              </span>
              <p className="text-sm font-semibold uppercase text-neutral-200">
                Crafted for those who walk with authority.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold uppercase text-neutral-100 mb-2">
              Weight & Textile Integrity
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We exclusively source heavyweight combed cotton and dense loopback French terry ranging from 280GSM for t-shirts to 480GSM for hoodies and sweatpants.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold uppercase text-neutral-100 mb-2">
              Architectural Silhouette
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Drop shoulders, high-density structured hoods without unruly drawstrings, boxy torsos, and clean cropped hems engineered for modern streetwear posture.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold uppercase text-neutral-100 mb-2">
              Capsule Exclusivity
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every garment is released in numbered batch runs. Once a collection sells out, it is archived to preserve uniqueness and collector value across South Africa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
