import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, CollectionId, CategoryId, Currency } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollectionFilter } from './components/CollectionFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LookbookReels } from './components/LookbookReels';
import { BrandHeritage } from './components/BrandHeritage';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Footer } from './components/Footer';

export function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('landlords_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Currency selection (ZAR / USD)
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('landlords_currency');
      return (saved as Currency) || 'ZAR';
    } catch {
      return 'ZAR';
    }
  });

  // Filters
  const [selectedCollection, setSelectedCollection] = useState<CollectionId>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('landlords_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('landlords_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: string,
    color?: string,
    image?: string,
    quantity: number = 1
  ) => {
    const itemKey = `${product.id}-${size}-${color || 'default'}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedSize: size,
          selectedColor: color,
          selectedImage: image || product.frontImage,
          quantity,
        },
      ];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'ZAR' ? 'USD' : 'ZAR'));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Collection filter
      if (selectedCollection !== 'all' && product.collectionId !== selectedCollection) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCol = product.collection.toLowerCase().includes(q);
        const matchFabric = product.fabric.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        return matchName || matchCol || matchFabric || matchDesc;
      }
      return true;
    });
  }, [selectedCollection, selectedCategory, searchQuery]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onNavigate={scrollToSection}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Hero Cinematic Section */}
      <HeroSection
        onShopClick={() => scrollToSection('shop')}
        onLookbookClick={() => scrollToSection('lookbook')}
      />

      {/* Main Shop & Filter System */}
      <main className="flex-1">
        <CollectionFilter
          selectedCollection={selectedCollection}
          onSelectCollection={setSelectedCollection}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-neutral-900/30 border border-neutral-800">
              <p className="font-display text-lg uppercase text-neutral-400 mb-2">
                No garments found matching your filters
              </p>
              <p className="text-xs text-neutral-500 mb-6">
                Try selecting a different collection or resetting your search.
              </p>
              <button
                onClick={() => {
                  setSelectedCollection('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onOpenModal={(p) => setInspectingProduct(p)}
                  onQuickAdd={(p, s, c, img) => handleAddToCart(p, s, c, img, 1)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Editorial Campaign Film & Visual Lookbook */}
        <LookbookReels />

        {/* Brand Heritage & Atelier Craft */}
        <BrandHeritage />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={inspectingProduct}
        currency={currency}
        onClose={() => setInspectingProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutModalOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        items={cartItems}
        currency={currency}
        onClearCart={handleClearCart}
      />

      {/* Sizing Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}

export default App;
