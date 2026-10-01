export type CategoryId = 'all' | 'hot-coffee' | 'cold-beverages' | 'food' | 'desserts' | 'merchandise';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  price: number; // in INR
  description: string;
  badge?: string;
  image: string;
  roastLevel?: 'Light' | 'Medium' | 'Dark';
  intensity?: number; // 1-5
  temperature?: 'Hot' | 'Cold' | 'Ambient';
  servingSize?: string;
  calories?: number;
  dietary?: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan';
  customizable?: boolean;
  allergens?: string[];
  ingredients?: string[];
  pairing?: string;
}

export type StoreAmenity = 
  | 'High-Speed Wi-Fi' 
  | 'Power Outlets' 
  | 'Outdoor Seating' 
  | 'Pet Friendly' 
  | 'Drive-Thru' 
  | 'Live Brewing Bar' 
  | 'Late Night / 24x7' 
  | 'Meeting Space';

export type StoreMood = 'all' | 'work' | 'meet' | 'relax' | 'celebrate' | 'highway';

export interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  landmark: string;
  timing: string;
  phone: string;
  lat: number;
  lng: number;
  amenities: StoreAmenity[];
  moods: StoreMood[];
  isFlagship?: boolean;
  hasOrderPickup: boolean;
  image: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  publishedDate: string;
  category: string;
  summary: string;
  content: string[];
  image: string;
  author: string;
  authorRole: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  validTill: string;
  terms: string;
  minOrder?: number;
  highlight?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  quantity: number;
  customization?: {
    milk?: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Soy Milk' | 'No Milk';
    sugar?: 'No Sugar' | 'Normal' | 'Half Sugar' | 'Jaggery';
    shot?: 'Single Shot' | 'Double Shot (+₹40)';
    whippedCream?: boolean;
  };
  totalPrice: number;
}
