import React, { useState } from 'react';
import { Product, CollectionMeta, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { 
  X, Plus, Edit2, Trash2, CheckCircle2, AlertTriangle, 
  Layers, Package, ShieldCheck, RefreshCw, Eye, EyeOff, Download 
} from 'lucide-react';
import * as productService from '../services/productService';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  collections: CollectionMeta[];
  currency: Currency;
  onProductsUpdated: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  products,
  collections,
  currency,
  onProductsUpdated,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'products' | 'collections' | 'inventory'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formName, setFormName] = useState('');
  const [formCollection, setFormCollection] = useState('The Mansion Affairs');
  const [formCategory, setFormCategory] = useState<'hoodies' | 't-shirts' | 'crop-tops' | 'bottoms' | 'jerseys'>('hoodies');
  const [formPrice, setFormPrice] = useState<number>(1250);
  const [formSalePrice, setFormSalePrice] = useState<string>('');
  const [formStock, setFormStock] = useState<number>(20);
  const [formDescription, setFormDescription] = useState('');
  const [formFrontImage, setFormFrontImage] = useState('');
  const [formBackImage, setFormBackImage] = useState('');
  const [formInStock, setFormInStock] = useState(true);
  const [formIsNewDrop, setFormIsNewDrop] = useState(false);

  const startEdit = (p: Product) => {
    setEditingProduct(p);
    setIsCreating(false);
    setFormName(p.name);
    setFormCollection(p.collection);
    setFormCategory(p.category as any);
    setFormPrice(p.priceZAR);
    setFormSalePrice(p.salePriceZAR ? String(p.salePriceZAR) : '');
    setFormStock(p.stockQuantity ?? 20);
    setFormDescription(p.description);
    setFormFrontImage(p.frontImage);
    setFormBackImage(p.backImage || '');
    setFormInStock(p.inStock);
    setFormIsNewDrop(p.isNewDrop || false);
  };

  const startCreate = () => {
    setEditingProduct(null);
    setIsCreating(true);
    setFormName('');
    setFormCollection('The Mansion Affairs');
    setFormCategory('hoodies');
    setFormPrice(1250);
    setFormSalePrice('');
    setFormStock(25);
    setFormDescription('Heavyweight combed French Terry cotton streetwear piece.');
    setFormFrontImage('/brand-assets/Clothing_website__The_LandLords_RSA_Garments__The_LandLords_RSA_Products__Mansion_Affairs__The_Mansion_Affair_Hoodie_Front_.png');
    setFormBackImage('');
    setFormInStock(true);
    setFormIsNewDrop(true);
  };

  const cancelForm = () => {
    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formFrontImage.trim()) {
      setStatusMessage('Please enter a garment name and front image URL.');
      return;
    }

    if (isCreating) {
      const newProd: Product = {
        id: `custom-${Date.now()}`,
        name: formName,
        collection: formCollection,
        collectionId: formCollection.toLowerCase().includes('angel')
          ? 'angel-kind'
          : formCollection.toLowerCase().includes('hoops')
          ? 'love-hoops-dreams'
          : formCollection.toLowerCase().includes('golden')
          ? 'golden-resort'
          : 'mansion-affairs',
        category: formCategory,
        priceZAR: Number(formPrice) || 999,
        salePriceZAR: formSalePrice ? Number(formSalePrice) : undefined,
        stockQuantity: Number(formStock) || 0,
        description: formDescription,
        frontImage: formFrontImage,
        backImage: formBackImage || undefined,
        sizes: ['S', 'M', 'L', 'XL'],
        fabric: '480GSM Combed Heavy French Terry',
        fit: 'Boxy Silhouette',
        inStock: formInStock,
        isNewDrop: formIsNewDrop,
      };

      await productService.createProduct(newProd);
      setStatusMessage(`Created "${newProd.name}" successfully.`);
    } else if (editingProduct) {
      await productService.updateProduct(editingProduct.id, {
        name: formName,
        collection: formCollection,
        category: formCategory,
        priceZAR: Number(formPrice) || editingProduct.priceZAR,
        salePriceZAR: formSalePrice ? Number(formSalePrice) : undefined,
        stockQuantity: Number(formStock) || 0,
        description: formDescription,
        frontImage: formFrontImage,
        backImage: formBackImage || undefined,
        inStock: formInStock,
        isNewDrop: formIsNewDrop,
      });
      setStatusMessage(`Updated "${formName}" successfully.`);
    }

    onProductsUpdated();
    cancelForm();
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleToggleStock = async (p: Product) => {
    await productService.updateProduct(p.id, { inStock: !p.inStock });
    onProductsUpdated();
    setStatusMessage(`Toggled stock status for ${p.name}.`);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleDelete = async (p: Product) => {
    if (window.confirm(`Are you sure you want to remove "${p.name}" from the active drop catalog?`)) {
      await productService.deleteProduct(p.id);
      onProductsUpdated();
      setStatusMessage(`Deleted "${p.name}".`);
      setTimeout(() => setStatusMessage(null), 2500);
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset catalog back to initial master drop items?')) {
      await productService.resetProductCatalog();
      onProductsUpdated();
      setStatusMessage('Product catalog reset to master defaults.');
      setTimeout(() => setStatusMessage(null), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-neutral-950 font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white font-display">
                The LandLords RSA • Owner Dashboard
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Storefront Inventory, Drop Management & Supabase Layer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="admin-download-website-zip"
              href="/the-landlords-rsa-website.zip"
              download="the-landlords-rsa-website.zip"
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="Download Full Website ZIP Archive"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download ZIP</span>
            </a>
            <button
              onClick={handleResetDefaults}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs flex items-center gap-1.5 transition-colors"
              title="Reset Catalog to Defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="px-6 py-2.5 bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-neutral-950/60 border-b border-neutral-800">
          <button
            onClick={() => { setActiveTab('products'); cancelForm(); }}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Package className="w-4 h-4" />
            Products ({products.length})
          </button>
          <button
            onClick={() => { setActiveTab('collections'); cancelForm(); }}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'collections'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Collections ({collections.length})
          </button>
          <button
            onClick={() => { setActiveTab('inventory'); cancelForm(); }}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Stock & Inventory
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div>
              {/* If Add or Edit Form is open */}
              {(isCreating || editingProduct) ? (
                <form onSubmit={handleSaveProduct} className="bg-neutral-950 rounded-2xl p-6 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                      {isCreating ? 'Create New Drop Piece' : `Edit: ${editingProduct?.name}`}
                    </h3>
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Garment Name *
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                        placeholder="e.g. The Mansion Affairs Heavyweight Hoodie"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Collection
                      </label>
                      <select
                        value={formCollection}
                        onChange={(e) => setFormCollection(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                      >
                        <option value="The Mansion Affairs">The Mansion Affairs</option>
                        <option value="Angel Kind">Angel Kind</option>
                        <option value="Love, Hoops & Dreams">Love, Hoops & Dreams</option>
                        <option value="Golden Resort">Golden Resort</option>
                        <option value="Atelier Collaborations">Atelier Collaborations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Category
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                      >
                        <option value="hoodies">Hoodies & Zippers</option>
                        <option value="t-shirts">T-Shirts</option>
                        <option value="crop-tops">Crop-Tops & Tanks</option>
                        <option value="bottoms">Trackpants & Shorts</option>
                        <option value="jerseys">Jerseys & Collabs</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                          Price (ZAR) *
                        </label>
                        <input
                          type="number"
                          value={formPrice}
                          onChange={(e) => setFormPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                          Sale Price (ZAR)
                        </label>
                        <input
                          type="number"
                          value={formSalePrice}
                          onChange={(e) => setFormSalePrice(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Front Image URL / Path *
                      </label>
                      <input
                        type="text"
                        value={formFrontImage}
                        onChange={(e) => setFormFrontImage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                        Back Image URL / Path (Optional)
                      </label>
                      <input
                        type="text"
                        value={formBackImage}
                        onChange={(e) => setFormBackImage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                        placeholder="Clean back view asset"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Garment Description & Fabric Details
                    </label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={formInStock}
                        onChange={(e) => setFormInStock(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-400 focus:ring-0"
                      />
                      <span>Item is In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={formIsNewDrop}
                        onChange={(e) => setFormIsNewDrop(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-400 focus:ring-0"
                      />
                      <span>Mark as "NEW DROP"</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs font-bold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                      Save Garment
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-neutral-400 font-mono">
                      Total Active Catalog: {products.length} Garments
                    </span>
                    <button
                      onClick={startCreate}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Garment
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl flex items-center justify-between gap-4 hover:border-neutral-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-neutral-900 p-1 flex items-center justify-center border border-neutral-800 shrink-0">
                            <img
                              src={prod.frontImage}
                              alt={prod.name}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs sm:text-sm font-bold text-white">
                                {prod.name}
                              </h4>
                              {prod.badge && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] bg-neutral-800 text-amber-400 border border-amber-400/20 uppercase font-mono">
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              {prod.collection} • {formatPrice(prod.priceZAR, currency)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStock(prod)}
                            className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-all ${
                              prod.inStock
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                                : 'bg-red-950/60 text-red-400 border border-red-800/40'
                            }`}
                            title={prod.inStock ? 'In Stock (Click to mark Sold Out)' : 'Sold Out (Click to mark In Stock)'}
                          >
                            {prod.inStock ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span className="text-[10px] uppercase font-bold hidden sm:inline">
                              {prod.inStock ? 'In Stock' : 'Sold Out'}
                            </span>
                          </button>

                          <button
                            onClick={() => startEdit(prod)}
                            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                            title="Edit Garment Details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(prod)}
                            className="p-2 rounded-xl bg-neutral-900 hover:bg-red-950 text-neutral-500 hover:text-red-400 border border-neutral-800 transition-colors"
                            title="Delete Garment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 2: COLLECTIONS */}
          {activeTab === 'collections' && (
            <div className="space-y-4">
              <span className="text-xs text-neutral-400 font-mono block mb-2">
                Active Brand Capsules & Editorial Manifestos
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collections.map((col) => (
                  <div
                    key={col.id}
                    className="p-5 bg-neutral-950/70 border border-neutral-800 rounded-2xl flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-white uppercase font-display">
                          {col.name}
                        </h4>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                          style={{ backgroundColor: `${col.accentColor}20`, color: col.accentColor }}
                        >
                          {col.id}
                        </span>
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono mb-1">
                        "{col.headline}"
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {col.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80">
                      <div className="flex items-center gap-1.5">
                        {col.palette.map((color, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-neutral-700"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-500 uppercase font-mono">
                        Active Capsule
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
                <span>
                  Inventory is linked to the active storefront. Updates reflect immediately on product cards and checkout validation.
                </span>
              </div>

              <div className="border border-neutral-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">Garment</th>
                      <th className="p-3.5">Collection</th>
                      <th className="p-3.5">Units In Stock</th>
                      <th className="p-3.5">Stock Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 bg-neutral-950/40">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="p-3.5 font-bold text-white flex items-center gap-2">
                          <img src={p.frontImage} alt="" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
                          <span>{p.name}</span>
                        </td>
                        <td className="p-3.5 text-neutral-400">{p.collection}</td>
                        <td className="p-3.5 font-mono">{p.stockQuantity ?? 20} pcs</td>
                        <td className="p-3.5">
                          {p.inStock ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/30 uppercase font-mono">
                              Available
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800/30 uppercase font-mono">
                              Sold Out
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
