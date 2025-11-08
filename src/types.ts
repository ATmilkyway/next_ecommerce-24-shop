// since the project is small, i can keep all types here :)
// Show: title, price, rating, category, image in each product card,

// Products

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
  thumbnail?: string;
}

export interface FeatchedProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type FeatchedCategories = Category[];
