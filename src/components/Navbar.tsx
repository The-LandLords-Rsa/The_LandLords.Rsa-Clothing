import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Globe, Film, Sparkles, HelpCircle } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: Currency;
  onToggleCurrency: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenSizeGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onToggleCurrency,
  onNavigate,
  onOpenSizeGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 py-1.5 px-4 text-center text-xs tracking-widest text-neutral-400 border-b border-neutral-800/50 uppercase font-medium flex items-center justify-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>New Drop: Mansion Affairs & Love, Hoops & Dreams</span>
        <span className="hidden sm:inline text-neutral-600">|</span>
        <span className="hidden sm:inline text-neutral-400">Free SA Shipping over R1,500</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <button
            id="brand-home-button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900 p-0.5 shadow-sm group-hover:border-amber-400/80 transition-colors">
              <img
                src="/brand-assets/Clothing_website__Logo__The_LandLords_rsa__Logo_s_.jpg"
                alt="The LandLords RSA Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-display block text-lg sm:text-xl font-bold tracking-wider text-neutral-100 group-hover:text-amber-400 transition-colors">
                THE LANDLORDS
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-semibold">
                RSA • EST. 2026
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              id="nav-collection-btn"
              onClick={() => handleNavClick('shop')}
              className="text-sm font-medium tracking-wider text-neutral-300 hover:text-amber-400 transition-colors uppercase"
            >
              Collections
            </button>
            <button
              id="nav-lookbook-btn"
              onClick={() => handleNavClick('lookbook')}
              className="text-sm font-medium tracking-wider text-neutral-300 hover:text-amber-400 transition-colors uppercase flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              Campaign Film
            </button>
            <button
              id="nav-story-btn"
              onClick={() => handleNavClick('heritage')}
              className="text-sm font-medium tracking-wider text-neutral-300 hover:text-amber-400 transition-colors uppercase"
            >
              Heritage
            </button>
            <button
              id="nav-sizeguide-btn"
              onClick={onOpenSizeGuide}
              className="text-sm font-medium tracking-wider text-neutral-400 hover:text-neutral-200 transition-colors uppercase flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Size Guide
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <button
              id="currency-toggle-btn"
              onClick={onToggleCurrency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
              title="Toggle ZAR / USD currency"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>{currency}</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              id="shopping-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-100 hover:text-amber-400 transition-all focus:outline-none"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-neutral-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-neutral-200" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('shop')}
            className="w-full text-left py-2.5 text-sm font-semibold tracking-wider text-neutral-200 hover:text-amber-400 uppercase border-b border-neutral-900"
          >
            Collections & Garments
          </button>
          <button
            onClick={() => handleNavClick('lookbook')}
            className="w-full text-left py-2.5 text-sm font-semibold tracking-wider text-neutral-200 hover:text-amber-400 uppercase border-b border-neutral-900 flex items-center justify-between"
          >
            <span>Campaign Film & Lookbook</span>
            <Film className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => handleNavClick('heritage')}
            className="w-full text-left py-2.5 text-sm font-semibold tracking-wider text-neutral-200 hover:text-amber-400 uppercase border-b border-neutral-900"
          >
            Brand Heritage & Craft
          </button>
          <button
            onClick={() => {
              onOpenSizeGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 text-sm font-semibold tracking-wider text-neutral-400 hover:text-neutral-200 uppercase flex items-center justify-between"
          >
            <span>Size Guide & Fits</span>
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
