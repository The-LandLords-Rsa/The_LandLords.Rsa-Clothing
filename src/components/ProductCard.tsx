import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { Eye, Plus, Repeat } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onOpenModal: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color?: string, image?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onOpenModal,
  onQuickAdd,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showBackView, setShowBackView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determine current active front/back images based on colorway if present
  const activeColor = product.colors ? product.colors[selectedColorIndex] : null;
  const currentFront = activeColor ? activeColor.frontImage : product.frontImage;
  const currentBack = activeColor ? activeColor.backImage || product.backImage : product.backImage;

  // Toggle or hover image
  const displayImage = (showBackView || (isHovered && currentBack)) && currentBack
    ? currentBack
    : currentFront;

  const handleColorChange = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedColorIndex(index);
    setShowBackView(false);
  };

  const handleToggleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentBack) {
      setShowBackView(!showBackView);
    }
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first available size
    const defaultSize = product.sizes[0] || 'M';
    onQuickAdd(product, defaultSize, activeColor?.name, displayImage);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onOpenModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-neutral-900/40 border border-neutral-850 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60 cursor-pointer"
    >
      {/* Garment Image Container */}
      <div className="relative aspect-[3/4] w-full bg-neutral-900 overflow-hidden flex items-center justify-center p-4">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-neutral-950/90 text-amber-400 border border-amber-400/30 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.isNewDrop && !product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-amber-400 text-neutral-950">
              NEW
            </span>
          )}
        </div>

        {/* Flip Front / Back View Button */}
        {currentBack && (
          <button
            id={`toggle-view-${product.id}`}
            onClick={handleToggleView}
            className="absolute top-3 right-3 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 backdrop-blur-sm text-xs font-semibold flex items-center gap-1 transition-all z-10"
            title="Toggle Front / Back View"
          >
            <Repeat className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">
              {showBackView ? 'Front' : 'Back'}
            </span>
          </button>
        )}

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            className="flex-1 py-2.5 rounded-xl bg-neutral-950/90 hover:bg-neutral-900 border border-neutral-700 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 backdrop-blur-md transition-all shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Details</span>
          </button>

          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAddClick}
            className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold transition-all shadow-lg"
            title="Quick Add to Bag"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Collection & Colorway Row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90">
              {product.collection}
            </span>

            {/* Color swatches */}
            {product.colors && product.colors.length > 1 && (
              <div className="flex items-center gap-1.5">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={(e) => handleColorChange(e, i)}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedColorIndex === i
                        ? 'border-amber-400 scale-110 shadow-sm'
                        : 'border-neutral-600 hover:border-neutral-400'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Garment Title */}
          <h3 className="text-sm sm:text-base font-semibold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Fabric subtitle */}
          <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
            {product.fabric}
          </p>
        </div>

        {/* Price and Sizes row */}
        <div className="flex items-end justify-between pt-2 border-t border-neutral-800/60">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
              Price
            </span>
            <span className="text-base font-bold text-neutral-50 tracking-tight">
              {formatPrice(product.priceZAR, currency)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="px-1 py-0.5 rounded bg-neutral-800/80 text-neutral-300">
                {s}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-neutral-500 text-[10px]">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
