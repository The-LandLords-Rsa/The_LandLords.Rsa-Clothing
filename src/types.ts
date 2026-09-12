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
  salePriceZAR?: number;
  stockQuantity?: number;
  description: string;
  frontImage: string;
  backImage?: string;
  detailImages?: string[];
  video?: string;
  model3d?: string;
  colors?: ProductColor[];
  sizes: string[];
  fabric: string;
  fit: string;
  careInstructions?: string;
  tags?: string[];
  badge?: string;
  isNewDrop?: boolean;
  inStock: boolean;
}

export interface CollectionMeta {
  id: CollectionId;
  name: string;
  headline: string;
  subheadline: string;
  accentColor: string;
  palette: string[];
  description: string;
  heroImage?: string;
}

export interface ShoeOption {
  id: string;
  name: string;
  type: string;
  image: string;
  forGender?: 'both' | 'female';
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
