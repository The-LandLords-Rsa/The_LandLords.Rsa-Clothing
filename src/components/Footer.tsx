import React from 'react';
import { MessageCircle, Camera, Globe, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900 p-0.5">
                <img
                  src="/brand-assets/Clothing_website__Logo__The_LandLords_rsa__Logo_s_.jpg"
                  alt="The LandLords RSA"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-wider text-neutral-100 uppercase block">
                  THE LANDLORDS RSA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                  South Africa • Est. 2026
                </span>
              </div>
            </div>

            <p className="text-neutral-400 max-w-sm leading-relaxed font-light">
              Elevated South African luxury streetwear. Monolithic silhouettes, 480GSM loopback French terry, and unapologetic cultural pride.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/27710000000"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 hover:text-emerald-300 hover:border-emerald-700 transition-colors"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-pink-400 hover:text-pink-300 hover:border-pink-700 transition-colors"
                title="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-100 mb-4">
              Drops & Capsules
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-amber-400 transition-colors">
                  Mansion Affairs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-amber-400 transition-colors">
                  Love, Hoops & Dreams
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-amber-400 transition-colors">
                  Angel Kind Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-amber-400 transition-colors">
                  Golden Resort
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-amber-400 transition-colors">
                  ARA Futsal Club Collab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Info */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-100 mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-amber-400 transition-colors">
                  Size & Silhouette Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('heritage')} className="hover:text-amber-400 transition-colors">
                  Textile & GSM Specs
                </button>
              </li>
              <li>
                <span className="text-neutral-400">Paxi & Courier Guy Track</span>
              </li>
              <li>
                <span className="text-neutral-400">Returns & Exchanges (7 Days)</span>
              </li>
              <li>
                <a href="https://wa.me/27710000000" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                  Direct WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-100 mb-4">
              Archive Access
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
              Be the first to receive secret access links for future capsule drops.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to The LandLords RSA VIP drop alerts!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold uppercase tracking-wider text-[11px] transition-all"
              >
                Join Private List
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © 2026 The LandLords RSA. All Rights Reserved. Designed & Crafted in South Africa.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Johannesburg</span>
            <span>•</span>
            <span>Cape Town</span>
            <span>•</span>
            <span>Durban</span>
            <span>•</span>
            <span>Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
