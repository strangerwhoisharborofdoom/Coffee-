import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { productService } from '../../services/productService';
import { storeService } from '../../services/storeService';
import { storyService } from '../../services/storyService';
import { aiSearchService, GroundedSearchResult } from '../../services/aiSearchService';
import { Product, Store, JournalArticle } from '../../types';
import { Search, X, Sparkles, Coffee, MapPin, BookOpen, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [stories, setStories] = useState<JournalArticle[]>([]);
  
  // Grounding state
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [groundedResult, setGroundedResult] = useState<GroundedSearchResult | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setGroundedResult(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setStores([]);
      setStories([]);
      return;
    }

    const timer = setTimeout(async () => {
      const [matchedProducts, matchedStores, allStories] = await Promise.all([
        productService.search(query),
        storeService.filter('All Cities', 'all', query),
        storyService.getAll()
      ]);

      setProducts(matchedProducts.slice(0, 4));
      setStores(matchedStores.slice(0, 3));
      
      const q = query.toLowerCase();
      setStories(allStories.filter(s => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)).slice(0, 2));
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleAskGrounding = async (textToAsk?: string) => {
    const q = textToAsk || query;
    if (!q.trim()) return;
    setIsAskingAI(true);
    try {
      const result = await aiSearchService.askCCDConcierge(q);
      setGroundedResult(result);
    } finally {
      setIsAskingAI(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-[#140E0A] border border-[#3A2E27] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Search and Grounding Concierge"
      >
        {/* Top Search Input */}
        <div className="p-4 border-b border-[#2A1E17] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#9E8F84]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleAskGrounding();
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
            placeholder="Search coffee, drinks, cafés, Bangalore 1996 origins, or ask concierge..."
            className="w-full bg-transparent text-[#F5EDE6] text-base placeholder-[#7A6C62] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setGroundedResult(null);
              }}
              className="p-1 text-[#9E8F84] hover:text-[#EDE8E1]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-[#9E8F84] hover:text-white border border-[#3A2E27] rounded"
          >
            ESC
          </button>
        </div>

        {/* Quick Grounding Prompt Suggestions */}
        {!query && !groundedResult && (
          <div className="p-6 space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#9E8F84] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D93829]" />
              <span>Ask Search Grounded Concierge</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {[
                'Where was the first CCD café established in 1996?',
                'Tell me about shade-grown Arabica from Chikmagalur',
                'What is inside the legendary Devil’s Own frappe?',
                'Find 24x7 highway cafes on Bangalore-Mysuru expressway'
              ].map((promptText) => (
                <button
                  key={promptText}
                  onClick={() => {
                    setQuery(promptText);
                    handleAskGrounding(promptText);
                  }}
                  className="text-left p-3 rounded-lg bg-[#1D140E] hover:bg-[#2A1E17] border border-[#2F221B] text-[#D8CDC2] text-xs transition-colors group flex items-center justify-between"
                >
                  <span>{promptText}</span>
                  <ArrowRight className="w-3 h-3 text-[#9E8F84] group-hover:text-[#D93829] shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grounded AI Answer Display */}
        {isAskingAI && (
          <div className="p-6 flex items-center gap-3 text-sm text-[#D8CDC2] bg-[#1C130E] border-b border-[#2A1E17]">
            <Loader2 className="w-5 h-5 text-[#D93829] animate-spin shrink-0" />
            <span>Consulting Google Search data for verified Café Coffee Day facts...</span>
          </div>
        )}

        {groundedResult && !isAskingAI && (
          <div className="p-5 bg-[#1A120D] border-b border-[#2F221B] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D93829] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Verified CCD Intelligence
              </span>
              <span className="text-xs text-[#9E8F84]">Google Search Grounded</span>
            </div>
            <p className="text-sm text-[#DDD2C7] leading-relaxed whitespace-pre-line">
              {groundedResult.answer}
            </p>
            {groundedResult.sources && groundedResult.sources.length > 0 && (
              <div className="pt-2 border-t border-[#2F221B] flex flex-wrap items-center gap-2 text-xs text-[#9E8F84]">
                <span className="text-[11px] uppercase tracking-wider">Citations:</span>
                {groundedResult.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#251B15] text-[#D4A373] hover:text-[#EDE8E1] transition-colors"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Ask AI button if query typed */}
          {query.trim() && !isAskingAI && (
            <button
              onClick={() => handleAskGrounding()}
              className="w-full text-left p-3 rounded-lg bg-[#251B15] hover:bg-[#32231B] border border-[#3A2A20] text-sm text-[#F5EDE6] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D93829]" />
                <span>Ask Search Grounding: <strong>"{query}"</strong></span>
              </div>
              <span className="text-xs text-[#C89058] font-medium">Verify with Google Search →</span>
            </button>
          )}

          {/* Matched Products */}
          {products.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9E8F84]">
                Menu Items ({products.length})
              </div>
              <div className="space-y-1">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-[#1F1712] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#251B15] flex items-center justify-center shrink-0">
                        <Coffee className="w-4 h-4 text-[#D93829]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#F5EDE6] group-hover:text-[#D93829] transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-[#9E8F84]">{product.categoryName}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[#DDD2C7] tabular-nums">
                      ₹{product.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Cafés */}
          {stores.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9E8F84]">
                Café Locations ({stores.length})
              </div>
              <div className="space-y-1">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => {
                      navigate(`/stores`);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-[#1F1712] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#251B15] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#C89058]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#F5EDE6] group-hover:text-[#D93829] transition-colors">
                          {store.name}
                        </div>
                        <div className="text-xs text-[#9E8F84]">{store.landmark} · {store.city}</div>
                      </div>
                    </div>
                    <span className="text-xs text-[#C89058]">View Store →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Stories */}
          {stories.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9E8F84]">
                Journal & Heritage ({stories.length})
              </div>
              <div className="space-y-1">
                {stories.map((story) => (
                  <div
                    key={story.slug}
                    onClick={() => {
                      navigate(`/stories/${story.slug}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-[#1F1712] cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#251B15] flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-[#D93829]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#F5EDE6] group-hover:text-[#D93829] transition-colors line-clamp-1">
                          {story.title}
                        </div>
                        <div className="text-xs text-[#9E8F84]">{story.category} · {story.readTime}</div>
                      </div>
                    </div>
                    <span className="text-xs text-[#C89058]">Read →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.trim() && products.length === 0 && stores.length === 0 && stories.length === 0 && !groundedResult && !isAskingAI && (
            <div className="text-center py-8 text-[#9E8F84] space-y-2">
              <p className="text-sm">No direct catalogue match found for "{query}".</p>
              <button
                onClick={() => handleAskGrounding()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#251B15] hover:bg-[#32231B] text-white rounded-lg text-xs font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D93829]" />
                Ask Google Search Grounding Concierge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
