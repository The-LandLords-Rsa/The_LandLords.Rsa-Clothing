import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice, generateWhatsAppOrderUrl } from '../utils/format';
import { X, CheckCircle2, Truck, CreditCard, MessageCircle, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [courierMethod, setCourierMethod] = useState<'courier_guy' | 'paxi'>('courier_guy');
  const [paymentMethod, setPaymentMethod] = useState<'card_eft' | 'whatsapp'>('whatsapp');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotalZAR = items.reduce((acc, item) => acc + item.product.priceZAR * item.quantity, 0);
  const shippingZAR = subtotalZAR >= 1500 ? 0 : 120;
  const totalZAR = subtotalZAR + shippingZAR;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `LL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedId);
    setOrderComplete(true);

    if (paymentMethod === 'whatsapp') {
      const notes = `Delivery: ${address}, ${province} (Courier: ${courierMethod === 'courier_guy' ? 'The Courier Guy Door' : 'Paxi Pep Collection'}). Order ID: ${generatedId}`;
      const url = generateWhatsAppOrderUrl(items, totalZAR, fullName, notes);
      window.open(url, '_blank');
    }

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
              The LandLords RSA Secure Dispatch
            </span>
            <h3 className="font-display text-xl font-bold uppercase text-neutral-100">
              {orderComplete ? 'Order Confirmed' : 'Checkout & Delivery'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="font-display text-2xl font-bold uppercase text-neutral-100 mb-1">
                Thank You, {fullName || 'Valued Client'}!
              </h4>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Your order reference is <strong className="text-amber-400 font-mono text-sm">{orderNumber}</strong>. Our Johannesburg studio team has received your garment dispatch order.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-neutral-400">
                <span>Total Value:</span>
                <span className="font-bold text-neutral-100 font-mono">{formatPrice(totalZAR, currency)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping Method:</span>
                <span className="text-neutral-200">
                  {courierMethod === 'courier_guy' ? 'The Courier Guy (Door to Door)' : 'PAXI (Pep Store Pick-up)'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Dispatch Region:</span>
                <span className="text-neutral-200">{province}, South Africa</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  const url = generateWhatsAppOrderUrl(items, totalZAR, fullName, `Order Ref: ${orderNumber}`);
                  window.open(url, '_blank');
                }}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Concierge on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            {/* Contact Information */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <span>1. Contact & Customer Details</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 uppercase font-medium mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ross Dladla"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 uppercase font-medium mb-1">Phone / WhatsApp</label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +27 82 123 4567"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-neutral-400 uppercase font-medium mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.co.za"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Destination in South Africa */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <span>2. South Africa Shipping Destination</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-neutral-400 uppercase font-medium mb-1">Street Address / Pep Store Code</label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Suburb, City (or PEP store code for Paxi)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 uppercase font-medium mb-1">Province</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="North West">North West</option>
                    <option value="Northern Cape">Northern Cape</option>
                    <option value="International">International (DHL)</option>
                  </select>
                </div>
              </div>

              {/* Courier Selection */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setCourierMethod('courier_guy')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    courierMethod === 'courier_guy'
                      ? 'bg-neutral-850 border-amber-400 ring-1 ring-amber-400/50'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Truck className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-100 uppercase">The Courier Guy</div>
                    <div className="text-[10px] text-neutral-400">Door-to-door (2-3 days)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCourierMethod('paxi')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    courierMethod === 'paxi'
                      ? 'bg-neutral-850 border-amber-400 ring-1 ring-amber-400/50'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Truck className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-100 uppercase">PAXI Counter</div>
                    <div className="text-[10px] text-neutral-400">PEP store collection</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                3. Payment & Settlement
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/50'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-100 uppercase">WhatsApp Concierge</div>
                    <div className="text-[10px] text-neutral-400">Fast confirmation & EFT</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card_eft')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                    paymentMethod === 'card_eft'
                      ? 'bg-neutral-850 border-amber-400 ring-1 ring-amber-400/50'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-neutral-100 uppercase">Instant EFT / Card</div>
                    <div className="text-[10px] text-neutral-400">Direct studio account</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Order Summary & Submit */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Garments Subtotal ({items.length} items):</span>
                <span className="font-mono text-neutral-200">{formatPrice(subtotalZAR, currency)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping ({province}):</span>
                <span className="font-mono text-neutral-200">
                  {shippingZAR === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : formatPrice(shippingZAR, currency)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-100 pt-2 border-t border-neutral-800">
                <span>Total Amount:</span>
                <span className="text-amber-400 font-display text-base">{formatPrice(totalZAR, currency)}</span>
              </div>
            </div>

            <button
              id="submit-order-btn"
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-400/10 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm & Place Order ({formatPrice(totalZAR, currency)})</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
