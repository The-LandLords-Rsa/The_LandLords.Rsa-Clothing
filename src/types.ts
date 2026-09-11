export type CollectionId = 
  | 'all'
  | 'mansion-affairs'
  | 'love-hoops-dreams'
  | 'angel-kind'
  | 'golden-resort'
  | 'collabs';

export type CategoryId = 
  | 'all'
  | 'hoodies'
  | 't-shirts'
  | 'crop-tops'
  | 'bottoms'
  | 'jerseys';

export interface ProductColor {
  name: string;
  hex: string;
  frontImage: string;
  backImage?: string;
}

export interface Product {
  id: string;
  name: string;
  collection: string;
  collectionId: CollectionId;
  category: CategoryId;
  priceZAR: number;
  description: string;
  frontImage: string;
  backImage?: string;
  detailImages?: string[];
  colors?: ProductColor[];
  sizes: string[];
  fabric: string;
  fit: string;
  badge?: string;
  isNewDrop?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  selectedImage: string;
  quantity: number;
}

export interface CampaignVideo {
  id: string;
  title: string;
  src: string;
  location: string;
  duration: string;
}

export interface CampaignPhoto {
  id: string;
  title: string;
  src: string;
  aspectRatio: string;
  tag: string;
}

export type Currency = 'ZAR' | 'USD';
