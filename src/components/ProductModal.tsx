import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice, generateWhatsAppOrderUrl } from '../utils/format';
import { X, Check, ShoppingBag, MessageCircle, Repeat, Truck, Shield, Sparkles, HelpCircle } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color?: string, image?: string, quantity?: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [showBackView, setShowBackView] = useState(false);
  const [activeDetailImage, setActiveDetailImage] = useState<string | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Active colorway configuration
  const activeColor = product.colors ? product.colors[selectedColorIndex] : null;
  const currentFront = activeColor ? activeColor.frontImage : product.frontImage;
  const currentBack = activeColor ? activeColor.backImage || product.backImage : product.backImage;

  const activeMainImage = activeDetailImage
    ? activeDetailImage
    : (showBackView && currentBack ? currentBack : currentFront);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, activeColor?.name, activeMainImage, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2000);
  };

  const handleWhatsAppInquiry = () => {
    const text = `*The LandLords RSA Product Inquiry*\n\nPiece: *${product.name}*\nCollection: ${product.collection}\nSize: ${selectedSize}\nColorway: ${activeColor?.name || 'Original'}\nPrice: R ${product.priceZAR}\n\nHi LandLords team, is this piece currently available for delivery?`;
    window.open(`https://wa.me/27710000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Garment Image Preview & Alternate angles / 3D Video */}
          <div className="relative bg-neutral-950 p-6 sm:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-neutral-800">
            {/* Main Stage Image / Video */}
            <div className="relative w-full aspect-square max-h-[420px] flex items-center justify-center bg-neutral-900/60 rounded-2xl overflow-hidden p-2">
              {isPlayingVideo && product.video ? (
                <video
                  src={product.video}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <img
                  src={activeMainImage}
                  alt={product.name}
                  className="w-full h-full object-contain object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Front / Back Toggle Float */}
              {currentBack && !activeDetailImage && !isPlayingVideo && (
                <button
                  id="modal-toggle-view-btn"
                  onClick={() => setShowBackView(!showBackView)}
                  className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition-all"
                >
                  <Repeat className="w-3.5 h-3.5 text-amber-400" />
                  <span>View {showBackView ? 'Front' : 'Back'}</span>
                </button>
              )}
            </div>

            {/* Thumbnail Selectors (Front, Back, 3D Video, Details) */}
            <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-neutral-800/80 overflow-x-auto w-full justify-center">
              <button
                onClick={() => {
                  setIsPlayingVideo(false);
                  setActiveDetailImage(null);
                  setShowBackView(false);
                }}
                className={`w-14 h-14 rounded-lg overflow-hidden border p-1 bg-neutral-900 transition-all ${
                  !isPlayingVideo && !activeDetailImage && !showBackView ? 'border-amber-400 ring-1 ring-amber-400' : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
                title="Front View"
              >
                <img src={currentFront} alt="Front" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </button>

              {currentBack && (
                <button
                  onClick={() => {
                    setIsPlayingVideo(false);
                    setActiveDetailImage(null);
                    setShowBackView(true);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border p-1 bg-neutral-900 transition-all ${
                    !isPlayingVideo && !activeDetailImage && showBackView ? 'border-amber-400 ring-1 ring-amber-400' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                  title="Back View"
                >
                  <img src={currentBack} alt="Back" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </button>
              )}

              {/* 3D Video Thumbnail */}
              {product.video && (
                <button
                  onClick={() => {
                    setIsPlayingVideo(true);
                    setActiveDetailImage(null);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border p-1 bg-neutral-900 flex flex-col items-center justify-center text-center transition-all ${
                    isPlayingVideo ? 'border-amber-400 ring-1 ring-amber-400 bg-amber-400/10' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                  title="Watch 3D Campaign Video"
                >
                  <span className="text-[10px] font-mono text-emerald-400 font-bold leading-tight uppercase">3D</span>
                  <span className="text-[9px] font-mono text-neutral-300 uppercase">Video</span>
                </button>
              )}

              {product.detailImages?.map((detailImg, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPlayingVideo(false);
                    setActiveDetailImage(detailImg);
                  }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border p-1 bg-neutral-900 transition-all ${
                    !isPlayingVideo && activeDetailImage === detailImg ? 'border-amber-400 ring-1 ring-amber-400' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={detailImg} alt={`Detail ${idx + 1}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Garment Specs, Sizing, & Ordering */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[680px] overflow-y-auto">
            <div>
              {/* Collection & Status */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400">
                  {product.collection}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-neutral-100 leading-tight mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-extrabold text-neutral-50 tracking-tight">
                  {formatPrice(product.salePriceZAR || product.priceZAR, currency)}
                </span>
                {product.salePriceZAR && (
                  <span className="text-base text-neutral-500 line-through font-medium font-mono">
                    {formatPrice(product.priceZAR, currency)}
                  </span>
                )}
                {product.salePriceZAR && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-neutral-950 uppercase font-mono">
                    Special Drop Price
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6 border-b border-neutral-800 pb-4">
                {product.description}
              </p>

              {/* Colorway Selection if available */}
              {product.colors && product.colors.length > 1 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    <span>Colorway</span>
                    <span className="text-amber-400 font-bold">{activeColor?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColorIndex(i);
                          setActiveDetailImage(null);
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          selectedColorIndex === i
                            ? 'bg-neutral-800 border-amber-400 text-white shadow-sm'
                            : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-neutral-700" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <span>👉 Step 1: Select Your Size</span>
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium lowercase tracking-normal"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>size chart</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      id={`modal-size-${s}`}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                        selectedSize === s
                          ? 'bg-amber-400 text-neutral-950 shadow-md ring-2 ring-amber-400/50'
                          : 'bg-neutral-850 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Garment Specifications Panel */}
              <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2 text-xs mb-5">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500 font-medium">Textile & GSM</span>
                  <span className="font-semibold text-neutral-200">{product.fabric}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500 font-medium">Silhouette Fit</span>
                  <span className="font-semibold text-neutral-200">{product.fit}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500 font-medium">Production Origin</span>
                  <span className="font-semibold text-amber-400">South Africa (RSA)</span>
                </div>
              </div>
            </div>

            {/* Pointer Callout Label to Buy Button */}
            <div className="mb-2.5 p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="animate-bounce">👇</span>
                <span>Step 2: Add to Trolley & Continue to Checkout</span>
              </span>
              <span className="font-mono text-[10px] text-neutral-400 font-normal">Fast Dispatch RSA</span>
            </div>

            {/* Action Buttons: Add to Trolley & Direct Checkout */}
            <div className="space-y-2.5 pt-1">
              {/* Quantity selector & Add to Trolley */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded text-neutral-400 hover:text-white font-bold text-lg flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-neutral-100 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded text-neutral-400 hover:text-white font-bold text-lg flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    addedNotice
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-lg shadow-amber-400/10 active:scale-98'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Trolley!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Trolley • {formatPrice(product.priceZAR * quantity, currency)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Ordering link */}
              <button
                id="modal-whatsapp-inquire-btn"
                onClick={handleWhatsAppInquiry}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-emerald-400 hover:text-emerald-300 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Inquire via WhatsApp</span>
              </button>

              {/* Delivery Notice */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  Paxi / The Courier Guy SA
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" />
                  100% Authentic Garments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
