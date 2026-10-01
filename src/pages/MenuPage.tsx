import React, { useState, useEffect } from 'react';
import { Product, CategoryId } from '../types';
import { productService } from '../services/productService';
import { ProductCard } from '../components/product/ProductCard';
import { ProductModal } from '../components/product/ProductModal';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { useRouter } from '../context/RouterContext';
import { Search, Coffee, Utensils, IceCream, ShoppingBag, Sparkles, Filter } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    (params.category as CategoryId) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'Vegetarian' | 'Vegan' | 'Non-Vegetarian'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = productService.getCategories();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      productService.getByCategory(activeCategory).then(items => {
        let filtered = items;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.ingredients?.some(ing => ing.toLowerCase().includes(q))
          );
        }
        if (dietaryFilter !== 'all') {
          filtered = filtered.filter(p => p.dietary === dietaryFilter);
        }
        setProducts(filtered);
        setIsLoading(false);
      });
    }, 180);

    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, dietaryFilter]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId as CategoryId);
    if (catId === 'all') {
      navigate('/menu');
    } else {
      navigate(`/menu/${catId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Header */}
      <div className="bg-[#140E0A] border-b border-[#261B15] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D93829]">
            <Coffee className="w-4 h-4" />
            <span>Café Coffee Day Master Menu</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EDE6]">
            Crafted for Every Conversation
          </h1>
          <p className="text-sm sm:text-base text-[#9E8F84] max-w-2xl leading-relaxed">
            From single-origin Chikmagalur Arabica espressos and the cult Devil’s Own frappe to spicy chilli cheese toast and warm sizzling brownies.
          </p>

          {/* Search bar & dietary filter */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#9E8F84] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cappuccino, mocha, brownie, frappe, roast..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1C130E] border border-[#2F221B] rounded-lg text-sm text-[#F5EDE6] placeholder-[#7A6C62] focus:outline-none focus:border-[#D93829]"
              />
            </div>

            {/* Dietary Filter Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-[#1C130E] rounded-lg border border-[#2F221B] overflow-x-auto">
              {(['all', 'Vegetarian', 'Vegan', 'Non-Vegetarian'] as const).map(diet => (
                <button
                  key={diet}
                  onClick={() => setDietaryFilter(diet)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    dietaryFilter === diet
                      ? 'bg-[#2A1E17] text-[#F5EDE6] shadow-sm'
                      : 'text-[#9E8F84] hover:text-[#EDE8E1]'
                  }`}
                >
                  {diet === 'all' ? 'All Diets' : diet}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                    isActive
                      ? 'bg-[#D93829] border-[#D93829] text-white shadow-sm'
                      : 'bg-[#18110D] border-[#2A1E17] text-[#9E8F84] hover:text-[#EDE8E1]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="ml-1.5 text-[11px] opacity-70">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between pb-6 text-xs text-[#9E8F84]">
          <span>Showing {products.length} Items</span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => handleCategoryChange('all')}
              className="text-[#C89058] hover:underline"
            >
              Reset to Full Menu
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-[#140E0A] border border-[#261B15] rounded-xl p-8 space-y-3">
            <p className="text-sm text-[#DDD2C7]">No items matched your current menu search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
