import { STORES_DATA, CITIES_LIST } from '../data/stores';
import { Store, StoreMood } from '../types';

export const storeService = {
  async getAll(): Promise<Store[]> {
    return Promise.resolve(STORES_DATA);
  },

  async getById(id: string): Promise<Store | undefined> {
    return Promise.resolve(STORES_DATA.find(s => s.id === id));
  },

  async filter(city: string, mood: StoreMood, search: string): Promise<Store[]> {
    let result = [...STORES_DATA];

    if (city && city !== 'All Cities') {
      result = result.filter(s => s.city.toLowerCase() === city.toLowerCase());
    }

    if (mood && mood !== 'all') {
      result = result.filter(s => s.moods.includes(mood));
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.landmark.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.amenities.some(a => a.toLowerCase().includes(q))
      );
    }

    return Promise.resolve(result);
  },

  getCities() {
    return CITIES_LIST;
  }
};
