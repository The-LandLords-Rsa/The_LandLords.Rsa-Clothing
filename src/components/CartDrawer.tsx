import React from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice, generateWhatsAppOrderUrl } from '../utils/format';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD_ZAR = 1500;
  const subtotalZAR = items.reduce((acc, item) => acc + item.product.priceZAR * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_ZAR - subtotalZAR);
  const freeShippingProgress = Math.min(100, (subtotalZAR / FREE_SHIPPING_THRESHOLD_ZAR) * 100);

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderUrl(items, subtotalZAR);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wider text-neutral-100">
                Your Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (ZAR 1,500 target) */}
          <div className="px-6 py-3.5 bg-neutral-950/70 border-b border-neutral-800 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">Free Delivery Unlocked!</span>
                ) : (
                  <span>
                    Add <span className="text-amber-400 font-bold">{formatPrice(remainingForFreeShipping, currency)}</span> for Free SA Shipping
                  </span>
                )}
              </span>
              <span className="text-neutral-400">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                <div className="w-16 h-16 rounded-full bg-neutral-800/80 flex items-center justify-center mb-4 text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display text-base font-bold uppercase text-neutral-200 mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-neutral-400 max-w-xs mb-6">
                  Explore The LandLords RSA latest drops and add exclusive garments to your bag.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl bg-neutral-900 overflow-hidden shrink-0 border border-neutral-800 flex items-center justify-center p-1.5">
                    <img
                      src={item.selectedImage}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-neutral-200 line-clamp-1 uppercase">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                        <span>Size: <strong className="text-neutral-200 font-mono">{item.selectedSize}</strong></span>
                        {item.selectedColor && (
                          <>
                            <span>•</span>
                            <span>{item.selectedColor}</span>
                          </>
                        )}
                      </div>

                      <div className="text-xs font-bold text-amber-400 mt-1">
                        {formatPrice(item.product.priceZAR, currency)}
                      </div>
                    </div>

                    {/* Quantity Adjustment */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-850">
                      <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded text-neutral-400 hover:text-white flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-neutral-100 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded text-neutral-400 hover:text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-neutral-200 font-mono">
                        {formatPrice(item.product.priceZAR * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-200 font-mono">
                    {formatPrice(subtotalZAR, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Shipping (South Africa)</span>
                  <span className="text-neutral-200 font-mono">
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      formatPrice(120, currency)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-neutral-100 pt-2 border-t border-neutral-800">
                  <span>Total Due</span>
                  <span className="text-amber-400 font-display text-base">
                    {formatPrice(
                      remainingForFreeShipping === 0 ? subtotalZAR : subtotalZAR + 120,
                      currency
                    )}
                  </span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  id="cart-proceed-checkout-btn"
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="cart-whatsapp-order-btn"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to Brand WhatsApp</span>
                </button>
              </div>

              <div className="text-[10px] text-center text-neutral-500">
                Secure nationwide fulfillment via Paxi & The Courier Guy.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
