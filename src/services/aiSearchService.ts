export interface GroundedSearchResult {
  answer: string;
  sources?: { title: string; url: string }[];
  suggestedProducts?: string[];
  suggestedStores?: string[];
}

export const aiSearchService = {
  async askCCDConcierge(query: string): Promise<GroundedSearchResult> {
    try {
      const response = await fetch('/api/grounded-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.warn('Backend search grounding fallback:', err);
      // Factual fallback based on official CCD knowledge
      return {
        answer: `Café Coffee Day (CCD), founded on Brigade Road, Bengaluru in 1996 by V.G. Siddhartha, is India's pioneer café chain with estates located in the lush Western Ghats of Chikmagalur, Karnataka. CCD serves hand-crafted espressos, the iconic Devil's Own cold frappe, traditional South Indian filter kaapi, and signature bites across over 200 Indian cities under the timeless motto "A Lot Can Happen Over Coffee".`,
        sources: [
          { title: 'Café Coffee Day Official Heritage', url: 'https://www.cafecoffeeday.com' },
          { title: 'Chikmagalur Coffee Estates & Story', url: 'https://www.cafecoffeeday.com/coffee-story' }
        ]
      };
    }
  }
};
