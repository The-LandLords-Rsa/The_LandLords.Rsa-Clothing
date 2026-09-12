import React from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Sparkles, ShoppingBag, Shirt, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductChoiceModalProps {
  product: Product | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onSelectJustBuy: (product: Product) => void;
  onSelectBuildOutfit: (product: Product) => void;
}

export const ProductChoiceModal: React.FC<ProductChoiceModalProps> = ({
  product,
  currency,
  isOpen,
  onClose,
  onSelectJustBuy,
  onSelectBuildOutfit,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        id="product-choice-dialog"
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          id="close-choice-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Garment Preview */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-800/80">
          <div className="w-20 h-20 rounded-2xl bg-neutral-950 p-2 border border-neutral-800 shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={product.frontImage}
              alt={product.name}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
              {product.collection}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-white leading-tight mb-1">
              {product.name}
            </h3>
            <span className="text-base font-black text-neutral-200">
              {formatPrice(product.priceZAR, currency)}
            </span>
          </div>
        </div>

        {/* Prompt Question */}
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
            Choose Your Experience
          </span>
          <h4 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-white tracking-wide">
            Do you want to build your outfit or just buy?
          </h4>
        </div>

        {/* The Two Main Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* OPTION 1: JUST BUY */}
          <button
            id="choice-just-buy-btn"
            onClick={() => {
              onClose();
              onSelectJustBuy(product);
            }}
            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-400/80 transition-all text-left hover:shadow-xl hover:shadow-amber-400/5 cursor-pointer"
          >
            <div className="space-y-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display text-base font-bold uppercase text-white group-hover:text-amber-400 transition-colors mb-1">
                  Just Buy This Piece
                </h5>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  View piece specifications, front & back artwork with text, size selector, and labels pointing directly to checkout.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>View Piece & Buy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* OPTION 2: BUILD YOUR OUTFIT */}
          <button
            id="choice-build-outfit-btn"
            onClick={() => {
              onClose();
              onSelectBuildOutfit(product);
            }}
            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-700 hover:border-cyan-400/80 transition-all text-left hover:shadow-xl hover:shadow-cyan-400/10 cursor-pointer"
          >
            <div className="space-y-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-neutral-950 transition-colors">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <h5 className="font-display text-base font-bold uppercase text-white group-hover:text-cyan-400 transition-colors">
                    Build Your Outfit
                  </h5>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Place this piece on the live mannequin. Pair with trackpants, hoodies, fleeces, and Air Force 1s for a complete look.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Load on Mannequin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          <span>The LandLords RSA • Authentic Streetwear Tailoring</span>
        </div>
      </div>
    </div>
  );
};
