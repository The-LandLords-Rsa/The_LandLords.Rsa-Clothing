import { Product, CollectionMeta, CollectionId } from '../types';
import { PRODUCTS, COLLECTIONS_META } from '../data/products';

// Local storage key for runtime mutations by Admin Dashboard
const STORAGE_KEY_PRODUCTS = 'landlords_products_db';
const STORAGE_KEY_COLLECTIONS = 'landlords_collections_db';

function getStoredProducts(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading products from storage:', e);
  }
  return PRODUCTS;
}

function saveStoredProducts(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products to storage:', e);
  }
}

/**
 * Clean service layer designed for seamless future Supabase replacement
 * as specified in Section 27 of The LandLords RSA Build Brief.
 */
export async function getProducts(): Promise<Product[]> {
  // In future: const { data, error } = await supabase.from('products').select('*');
  return getStoredProducts();
}
export const fetchProducts = getProducts;

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function getCollections(): Promise<CollectionMeta[]> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading collections from storage:', e);
  }
  return COLLECTIONS_META;
}
export const fetchCollections = getCollections;

export async function getCollectionBySlug(slug: CollectionId): Promise<CollectionMeta | null> {
  const collections = await getCollections();
  return collections.find(c => c.id === slug) || null;
}

export async function createProduct(newProduct: Product): Promise<Product> {
  const current = getStoredProducts();
  const updated = [newProduct, ...current];
  saveStoredProducts(updated);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const current = getStoredProducts();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const updatedProduct = { ...current[index], ...updates };
  current[index] = updatedProduct;
  saveStoredProducts(current);
  return updatedProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const current = getStoredProducts();
  const filtered = current.filter(p => p.id !== id);
  saveStoredProducts(filtered);
  return true;
}

export async function resetProductCatalog(): Promise<Product[]> {
  localStorage.removeItem(STORAGE_KEY_PRODUCTS);
  return PRODUCTS;
}
