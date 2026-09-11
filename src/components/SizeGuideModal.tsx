import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'hoodies' | 'tshirts' | 'croptops' | 'bottoms'>('hoodies');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-wider text-neutral-100">
                The LandLords Size & Fit Guide
              </h3>
              <p className="text-[11px] text-neutral-400">
                South African & International Metric Measurements (cm)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 p-2 gap-2">
          {(['hoodies', 'tshirts', 'croptops', 'bottoms'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-neutral-800 text-amber-400 shadow-sm border border-neutral-750'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab === 'croptops' ? 'Crop Tops' : tab}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-widest font-mono">
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Chest / Bust</th>
                  <th className="py-3 px-3">Length</th>
                  <th className="py-3 px-3">Shoulder / Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300 font-mono">
                {activeTab === 'hoodies' && (
                  <>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">S</td><td className="py-3 px-3">118 cm</td><td className="py-3 px-3">68 cm</td><td className="py-3 px-3">58 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">M</td><td className="py-3 px-3">124 cm</td><td className="py-3 px-3">71 cm</td><td className="py-3 px-3">60 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">L</td><td className="py-3 px-3">130 cm</td><td className="py-3 px-3">74 cm</td><td className="py-3 px-3">62 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">XL</td><td className="py-3 px-3">136 cm</td><td className="py-3 px-3">77 cm</td><td className="py-3 px-3">64 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">XXL</td><td className="py-3 px-3">142 cm</td><td className="py-3 px-3">80 cm</td><td className="py-3 px-3">65 cm</td></tr>
                  </>
                )}

                {activeTab === 'tshirts' && (
                  <>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">XS</td><td className="py-3 px-3">106 cm</td><td className="py-3 px-3">68 cm</td><td className="py-3 px-3">22 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">S</td><td className="py-3 px-3">112 cm</td><td className="py-3 px-3">71 cm</td><td className="py-3 px-3">23 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">M</td><td className="py-3 px-3">118 cm</td><td className="py-3 px-3">74 cm</td><td className="py-3 px-3">24 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">L</td><td className="py-3 px-3">124 cm</td><td className="py-3 px-3">77 cm</td><td className="py-3 px-3">25 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">XL</td><td className="py-3 px-3">130 cm</td><td className="py-3 px-3">80 cm</td><td className="py-3 px-3">26 cm</td></tr>
                  </>
                )}

                {activeTab === 'croptops' && (
                  <>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">XS</td><td className="py-3 px-3">82 cm</td><td className="py-3 px-3">40 cm</td><td className="py-3 px-3">14 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">S</td><td className="py-3 px-3">88 cm</td><td className="py-3 px-3">42 cm</td><td className="py-3 px-3">15 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">M</td><td className="py-3 px-3">94 cm</td><td className="py-3 px-3">44 cm</td><td className="py-3 px-3">16 cm</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">L</td><td className="py-3 px-3">100 cm</td><td className="py-3 px-3">46 cm</td><td className="py-3 px-3">17 cm</td></tr>
                  </>
                )}

                {activeTab === 'bottoms' && (
                  <>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">S (28-30)</td><td className="py-3 px-3">74-80 cm</td><td className="py-3 px-3">102 cm</td><td className="py-3 px-3">Track / 48 cm Shorts</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">M (32-34)</td><td className="py-3 px-3">80-86 cm</td><td className="py-3 px-3">105 cm</td><td className="py-3 px-3">Track / 50 cm Shorts</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">L (36)</td><td className="py-3 px-3">86-92 cm</td><td className="py-3 px-3">108 cm</td><td className="py-3 px-3">Track / 52 cm Shorts</td></tr>
                    <tr><td className="py-3 px-3 font-bold text-amber-400">XL (38+)</td><td className="py-3 px-3">92-100 cm</td><td className="py-3 px-3">111 cm</td><td className="py-3 px-3">Track / 54 cm Shorts</td></tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Advice Box */}
          <div className="mt-6 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 space-y-1.5">
            <div className="font-bold text-neutral-200 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Streetwear Silhouette Advice</span>
            </div>
            <p>
              The LandLords RSA pieces are crafted with a deliberate <strong>relaxed drop-shoulder boxy cut</strong>. For the intended relaxed street drape, order your standard regular size. If you desire a fitted look, choose one size smaller.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
