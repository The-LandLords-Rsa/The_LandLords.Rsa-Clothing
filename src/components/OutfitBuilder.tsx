import React, { useState, useMemo, useEffect } from 'react';
import { Product, Currency, ShoeOption } from '../types';
import { SHOES_STYLING } from '../data/products';
import { formatPrice } from '../utils/format';
import { Sparkles, ShoppingBag, MessageCircle, RotateCcw, Check, Repeat, UserCheck, Eye, Layers } from 'lucide-react';

interface OutfitBuilderProps {
  products: Product[];
  currency: Currency;
  preselectedProduct?: Product | null;
  onAddOutfitToCart: (items: { product: Product; size: string; image: string }[]) => void;
}

const REAL_MANNEQUIN_INSPIRATIONS = [
  {
    id: 'mannequin-01',
    title: 'Archive Mannequin Rig 01 • Heavyweight Stance',
    src: '/inspo/WhatsApp_Image_2026-09-11_at_15.24.44.jpeg',
    caption: 'Full-length streetwear silhouette with tailored trackpants & layered hoodie proportions.',
  },
  {
    id: 'mannequin-02',
    title: 'Archive Mannequin Rig 02 • Drop Shoulder Proportion',
    src: '/inspo/WhatsApp_Image_2026-09-11_at_15.24.45.jpeg',
    caption: 'Dual-piece ensemble showing drape fall, relaxed ankle taper, and structured cotton density.',
  },
  {
    id: 'mannequin-03',
    title: 'Editorial Vertical Rig • Street Contour',
    src: '/inspo/WhatsApp_Image_2026-09-11_at_15.21.04_1.jpeg',
    caption: 'Atelier staging reference for complete South African luxury streetwear styling.',
  },
  {
    id: 'mannequin-04',
    title: 'Urban Silhouette Rig • Tracksuit Fall',
    src: '/inspo/WhatsApp_Image_2026-09-11_at_15.25.18.jpeg',
    caption: 'High-waisted elasticized waistband and full drape silhouette.',
  }
];

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  products,
  currency,
  preselectedProduct,
  onAddOutfitToCart,
}) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedTopId, setSelectedTopId] = useState<string>('mansion-affairs-hoodie');
  const [selectedBottomId, setSelectedBottomId] = useState<string>('mansion-affairs-trackpants');
  const [selectedShoeId, setSelectedShoeId] = useState<string>('af1-white');
  const [topCategoryFilter, setTopCategoryFilter] = useState<'all' | 'hoodies' | 't-shirts' | 'crop-tops' | 'jerseys'>('all');
  const [showBackTop, setShowBackTop] = useState(false);
  const [showBackBottom, setShowBackBottom] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'real-mannequin'>('interactive');
  const [activeInspoIndex, setActiveInspoIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  // Sync if preselected product changes from parent
  useEffect(() => {
    if (!preselectedProduct) return;

    if (preselectedProduct.category === 'bottoms') {
      setSelectedBottomId(preselectedProduct.id);
    } else {
      setSelectedTopId(preselectedProduct.id);
      if (preselectedProduct.category === 'crop-tops') {
        setGender('female');
        setTopCategoryFilter('crop-tops');
      } else if (preselectedProduct.category === 'hoodies') {
        setTopCategoryFilter('hoodies');
      } else if (preselectedProduct.category === 't-shirts') {
        setTopCategoryFilter('t-shirts');
      }
    }
  }, [preselectedProduct]);

  // Available categories
  const allTopProducts = useMemo(() => {
    return products.filter(p => p.category === 'hoodies' || p.category === 't-shirts' || p.category === 'crop-tops' || p.category === 'jerseys');
  }, [products]);

  const topProducts = useMemo(() => {
    if (topCategoryFilter === 'all') return allTopProducts;
    return allTopProducts.filter(p => p.category === topCategoryFilter);
  }, [allTopProducts, topCategoryFilter]);

  const bottomProducts = useMemo(() => {
    return products.filter(p => p.category === 'bottoms');
  }, [products]);

  const availableShoes = useMemo(() => {
    if (gender === 'male') {
      return SHOES_STYLING.filter(s => s.forGender !== 'female');
    }
    return SHOES_STYLING;
  }, [gender]);

  const selectedTop = products.find(p => p.id === selectedTopId) || allTopProducts[0];
  const selectedBottom = products.find(p => p.id === selectedBottomId) || bottomProducts[0];
  const selectedShoe = SHOES_STYLING.find(s => s.id === selectedShoeId) || SHOES_STYLING[0];

  // Gender Rule: Female cut for crop tops
  const handleSelectTop = (product: Product) => {
    if (product.category === 'crop-tops' && gender === 'male') {
      setGender('female');
    }
    setSelectedTopId(product.id);
    setShowBackTop(false);
  };

  const handleGenderChange = (newGender: 'male' | 'female') => {
    if (newGender === 'male' && selectedTop?.category === 'crop-tops') {
      const fallbackTop = allTopProducts.find(p => p.category !== 'crop-tops');
      if (fallbackTop) setSelectedTopId(fallbackTop.id);
    }
    if (newGender === 'male' && selectedShoe?.forGender === 'female') {
      setSelectedShoeId('af1-white');
    }
    setGender(newGender);
  };

  const totalZAR = (selectedTop?.priceZAR || 0) + (selectedBottom?.priceZAR || 0);

  const handleAddOutfit = () => {
    const itemsToAdd: { product: Product; size: string; image: string }[] = [];
    if (selectedTop) {
      itemsToAdd.push({
        product: selectedTop,
        size: 'M',
        image: showBackTop && selectedTop.backImage ? selectedTop.backImage : selectedTop.frontImage,
      });
    }
    if (selectedBottom) {
      itemsToAdd.push({
        product: selectedBottom,
        size: 'M',
        image: showBackBottom && selectedBottom.backImage ? selectedBottom.backImage : selectedBottom.frontImage,
      });
    }
    onAddOutfitToCart(itemsToAdd);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleWhatsAppOutfit = () => {
    const topName = selectedTop ? selectedTop.name : 'None';
    const bottomName = selectedBottom ? selectedBottom.name : 'None';
    const shoeName = selectedShoe ? selectedShoe.name : 'None';

    const text = `*The LandLords RSA • Outfit Studio Request*\n\nSilhouette: *${gender.toUpperCase()}*\nTop Piece: ${topName} (R ${selectedTop?.priceZAR || 0})\nBottom Piece: ${bottomName} (R ${selectedBottom?.priceZAR || 0})\nFootwear Styling: ${shoeName}\n\n*Total Ensemble Value: R ${totalZAR}*\n\nHi LandLords RSA, please prepare this complete fit for delivery!`;
    window.open(`https://wa.me/27710000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="outfit-builder" className="py-20 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Mode Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Outfit Studio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-wide">
              Build Your Drop Outfit
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mt-2">
              Style heavy French terry hoodies, tailored trackpants, crop tops, and Air Force 1s on our live mannequin rig, or view the real-life archive inspiration.
            </p>
          </div>

          {/* Mode Switcher: Interactive Rig vs Real-Life Mannequin Inspo */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900 rounded-2xl border border-neutral-800 self-start md:self-auto shrink-0">
            <button
              id="mode-interactive-rig"
              onClick={() => setViewMode('interactive')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                viewMode === 'interactive'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Rig</span>
            </button>
            <button
              id="mode-real-mannequin"
              onClick={() => setViewMode('real-mannequin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                viewMode === 'real-mannequin'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Real-Life Mannequin Inspo</span>
            </button>
          </div>
        </div>

        {viewMode === 'real-mannequin' ? (
          /* REAL-LIFE MANNEQUIN ARCHIVE DISPLAY */
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Primary Stage Image */}
              <div className="lg:col-span-6 bg-neutral-950 rounded-2xl p-4 border border-neutral-800 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-sm aspect-[9/16] max-h-[600px] overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center">
                  <img
                    src={REAL_MANNEQUIN_INSPIRATIONS[activeInspoIndex].src}
                    alt={REAL_MANNEQUIN_INSPIRATIONS[activeInspoIndex].title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-sm text-amber-400 text-[10px] font-mono font-bold uppercase border border-amber-400/20">
                    Real-Life Mannequin Frame 0{activeInspoIndex + 1}
                  </div>
                </div>
              </div>

              {/* Inspo Selection Cards */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    Atelier Design Philosophy
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
                    {REAL_MANNEQUIN_INSPIRATIONS[activeInspoIndex].title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {REAL_MANNEQUIN_INSPIRATIONS[activeInspoIndex].caption}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Select Reference Frame
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {REAL_MANNEQUIN_INSPIRATIONS.map((inspo, idx) => (
                      <button
                        key={inspo.id}
                        onClick={() => setActiveInspoIndex(idx)}
                        className={`p-2 rounded-xl border text-left flex flex-col items-center transition-all ${
                          activeInspoIndex === idx
                            ? 'bg-neutral-800 border-amber-400 shadow-md ring-1 ring-amber-400'
                            : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="w-full aspect-[9/16] bg-neutral-900 rounded-lg overflow-hidden mb-2">
                          <img src={inspo.src} alt={inspo.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <span className="text-[10px] font-bold text-neutral-300 text-center line-clamp-1">
                          Frame 0{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800">
                  <button
                    onClick={() => setViewMode('interactive')}
                    className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    <span>Open Interactive Rig & Customize</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* INTERACTIVE MANNEQUIN RIG */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Mannequin Outfit Visualizer */}
            <div className="lg:col-span-6 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl relative">
              {/* Top Bar: Gender Toggle & Indicator */}
              <div className="w-full flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                  <button
                    id="gender-toggle-male"
                    onClick={() => handleGenderChange('male')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      gender === 'male' ? 'bg-amber-400 text-neutral-950 shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Male Cut
                  </button>
                  <button
                    id="gender-toggle-female"
                    onClick={() => handleGenderChange('female')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      gender === 'female' ? 'bg-amber-400 text-neutral-950 shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Female Cut
                  </button>
                </div>

                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  Live Mannequin Rig
                </span>
              </div>

              {/* Mannequin Garment Stack Display */}
              <div className="w-full max-w-sm flex flex-col items-center gap-3 py-2">
                {/* TOP PIECE (Hoodie / Zipper / Fleece / Tee / Crop Top) */}
                <div className="relative w-full aspect-square max-h-[270px] bg-neutral-950/80 rounded-2xl border border-neutral-800/80 p-4 flex items-center justify-center overflow-hidden group">
                  {selectedTop ? (
                    <img
                      src={showBackTop && selectedTop.backImage ? selectedTop.backImage : selectedTop.frontImage}
                      alt={selectedTop.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-neutral-600 text-xs uppercase font-mono">Select Top</div>
                  )}

                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-amber-400/20">
                    Top • {selectedTop?.collection}
                  </div>

                  {selectedTop?.backImage && (
                    <button
                      onClick={() => setShowBackTop(!showBackTop)}
                      className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-neutral-900/90 text-neutral-300 hover:text-white border border-neutral-700 text-[10px] font-bold uppercase flex items-center gap-1 shadow-md transition-all"
                    >
                      <Repeat className="w-3 h-3 text-amber-400" />
                      <span>{showBackTop ? 'Front' : 'Back'}</span>
                    </button>
                  )}
                </div>

                {/* BOTTOM PIECE (Trackpants / Long Pants / Shorts) */}
                <div className="relative w-full aspect-[4/3] max-h-[220px] bg-neutral-950/80 rounded-2xl border border-neutral-800/80 p-4 flex items-center justify-center overflow-hidden group">
                  {selectedBottom ? (
                    <img
                      src={showBackBottom && selectedBottom.backImage ? selectedBottom.backImage : selectedBottom.frontImage}
                      alt={selectedBottom.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-neutral-600 text-xs uppercase font-mono">Select Bottom</div>
                  )}

                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-cyan-400 uppercase tracking-wider border border-cyan-400/20">
                    Pants • {selectedBottom?.name}
                  </div>

                  {selectedBottom?.backImage && (
                    <button
                      onClick={() => setShowBackBottom(!showBackBottom)}
                      className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-neutral-900/90 text-neutral-300 hover:text-white border border-neutral-700 text-[10px] font-bold uppercase flex items-center gap-1 shadow-md transition-all"
                    >
                      <Repeat className="w-3 h-3 text-cyan-400" />
                      <span>{showBackBottom ? 'Front' : 'Back'}</span>
                    </button>
                  )}
                </div>

                {/* FOOTWEAR STYLING (Air Force 1, Dunk Low, Boot, Heels) */}
                <div className="relative w-full aspect-[3/1] max-h-[110px] bg-neutral-950/80 rounded-2xl border border-neutral-800/80 p-2 flex items-center justify-between px-5 overflow-hidden">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedShoe.image}
                      alt={selectedShoe.name}
                      className="w-14 h-14 object-cover rounded-xl border border-neutral-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-mono block">Footwear Styling</span>
                      <span className="text-xs font-bold text-neutral-100">{selectedShoe.name}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/40">
                    Curated Pair
                  </span>
                </div>
              </div>

              {/* Total Outfit Price & Actions */}
              <div className="w-full pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-mono">
                    Total Outfit Value
                  </span>
                  <span className="text-2xl font-black text-white tracking-tight">
                    {formatPrice(totalZAR, currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    id="add-outfit-to-bag-btn"
                    onClick={handleAddOutfit}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-neutral-950" />
                        <span>Added to Trolley!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Outfit to Trolley</span>
                      </>
                    )}
                  </button>

                  <button
                    id="whatsapp-outfit-btn"
                    onClick={handleWhatsAppOutfit}
                    className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-emerald-400 border border-neutral-700 transition-all"
                    title="Send Outfit Inspo via WhatsApp"
                    aria-label="Send Outfit Inspo via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Garment Customization Panels */}
            <div className="lg:col-span-6 space-y-6">
              {/* 1. Choose Top Section */}
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    1. Select Top (Hoodies, Zippers, Fleeces, Tees)
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">
                    {topProducts.length} options
                  </span>
                </div>

                {/* Subcategory Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3">
                  {[
                    { id: 'all', label: 'All Tops' },
                    { id: 'hoodies', label: 'Hoodies & Zippers' },
                    { id: 't-shirts', label: 'T-Shirts' },
                    { id: 'crop-tops', label: 'Crop-Tops' },
                    { id: 'jerseys', label: 'Jerseys' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setTopCategoryFilter(tab.id as any)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        topCategoryFilter === tab.id
                          ? 'bg-amber-400 text-neutral-950 font-bold'
                          : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {topProducts.map((prod) => {
                    const isSelected = prod.id === selectedTopId;
                    const isCropTop = prod.category === 'crop-tops';

                    return (
                      <button
                        key={prod.id}
                        onClick={() => handleSelectTop(prod)}
                        className={`relative p-2 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-neutral-800 border-amber-400 shadow-md'
                            : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                        }`}
                      >
                        <div className="w-full aspect-square bg-neutral-900 rounded-lg p-1.5 flex items-center justify-center">
                          <img
                            src={prod.frontImage}
                            alt={prod.name}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-200 line-clamp-1 text-center w-full">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-amber-400/90 font-mono">
                          {formatPrice(prod.priceZAR, currency)}
                        </span>
                        {isCropTop && (
                          <span className="absolute top-1 right-1 text-[8px] font-mono px-1 rounded bg-neutral-900 text-pink-400 border border-pink-500/30">
                            Female
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Choose Bottom Section */}
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    2. Select Pants (Trackpants & Shorts)
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">
                    {bottomProducts.length} options
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {bottomProducts.map((prod) => {
                    const isSelected = prod.id === selectedBottomId;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => {
                          setSelectedBottomId(prod.id);
                          setShowBackBottom(false);
                        }}
                        className={`relative p-2 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-neutral-800 border-cyan-400 shadow-md'
                            : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                        }`}
                      >
                        <div className="w-full aspect-square bg-neutral-900 rounded-lg p-1.5 flex items-center justify-center">
                          <img
                            src={prod.frontImage}
                            alt={prod.name}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-200 line-clamp-1 text-center w-full">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-cyan-400/90 font-mono">
                          {formatPrice(prod.priceZAR, currency)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Choose Footwear Styling (Air Force 1, etc.) */}
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    3. Select Footwear (Air Force 1, Dunks, Boots)
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">
                    {availableShoes.length} styles
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableShoes.map((shoe) => {
                    const isSelected = shoe.id === selectedShoeId;
                    return (
                      <button
                        key={shoe.id}
                        onClick={() => setSelectedShoeId(shoe.id)}
                        className={`relative p-2 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-neutral-800 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                            : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                        }`}
                      >
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-full aspect-square object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-bold text-neutral-200 line-clamp-1 text-center w-full">
                          {shoe.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
