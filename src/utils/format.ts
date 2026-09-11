import { Currency, CartItem } from '../types';

export const ZAR_TO_USD_RATE = 18.5;

export function formatPrice(amountZAR: number, currency: Currency): string {
  if (currency === 'USD') {
    const usd = Math.round(amountZAR / ZAR_TO_USD_RATE);
    return `$${usd}`;
  }
  return `R ${amountZAR.toLocaleString('en-ZA')}`;
}

export function generateWhatsAppOrderUrl(items: CartItem[], totalZAR: number, customerName?: string, notes?: string): string {
  const brandNumber = '27710000000'; // South Africa country code +27
  
  let text = `*New Order Inquiry — The LandLords RSA*\n\n`;
  if (customerName) {
    text += `*Customer:* ${customerName}\n`;
  }
  text += `---------------------------------\n`;
  
  items.forEach((item, index) => {
    text += `${index + 1}. *${item.product.name}*\n`;
    text += `   - Size: ${item.selectedSize}\n`;
    if (item.selectedColor) {
      text += `   - Colorway: ${item.selectedColor}\n`;
    }
    text += `   - Qty: ${item.quantity}\n`;
    text += `   - Price: R ${(item.product.priceZAR * item.quantity).toLocaleString('en-ZA')}\n\n`;
  });

  text += `---------------------------------\n`;
  text += `*Total Amount:* R ${totalZAR.toLocaleString('en-ZA')}\n`;
  if (notes) {
    text += `*Notes / Delivery Area:* ${notes}\n`;
  }
  text += `\nPlease confirm availability and payment details. Thank you!`;

  return `https://wa.me/${brandNumber}?text=${encodeURIComponent(text)}`;
}
