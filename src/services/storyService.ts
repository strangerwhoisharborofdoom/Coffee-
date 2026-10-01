import { STORIES_DATA, OFFERS_DATA } from '../data/stories';
import { JournalArticle, Offer } from '../types';

export const storyService = {
  async getAll(): Promise<JournalArticle[]> {
    return Promise.resolve(STORIES_DATA);
  },

  async getBySlug(slug: string): Promise<JournalArticle | undefined> {
    return Promise.resolve(STORIES_DATA.find(s => s.slug === slug));
  }
};

export const offerService = {
  async getAll(): Promise<Offer[]> {
    return Promise.resolve(OFFERS_DATA);
  }
};
