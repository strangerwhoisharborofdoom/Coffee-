import { MENU_PRODUCTS, MENU_CATEGORIES } from '../data/menu';
import { Product, CategoryId } from '../types';

export const productService = {
  async getAll(): Promise<Product[]> {
    return Promise.resolve(MENU_PRODUCTS);
  },

  async getByCategory(category: CategoryId): Promise<Product[]> {
    if (category === 'all') return Promise.resolve(MENU_PRODUCTS);
    return Promise.resolve(MENU_PRODUCTS.filter(p => p.category === category));
  },

  async getById(id: string): Promise<Product | undefined> {
    return Promise.resolve(MENU_PRODUCTS.find(p => p.id === id));
  },

  async search(query: string): Promise<Product[]> {
    const q = query.toLowerCase().trim();
    if (!q) return Promise.resolve(MENU_PRODUCTS);
    return Promise.resolve(
      MENU_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.pairing && p.pairing.toLowerCase().includes(q))
      )
    );
  },

  getCategories() {
    return MENU_CATEGORIES;
  }
};
