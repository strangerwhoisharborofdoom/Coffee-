import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { productService } from '../services/productService';
import { Product } from '../types';
import { ArrowLeft, Check, Plus, Minus, Coffee, Flame, ShieldAlert, Sparkles, ShoppingBag } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Soy Milk'>('Whole Milk');
  const [selectedSugar, setSelectedSugar] = useState<'Normal' | 'No Sugar' | 'Half Sugar' | 'Jaggery'>('Normal');
  const [selectedShot, setSelectedShot] = useState<'Single Shot' | 'Double Shot (+₹40)'>('Single Shot');

  useEffect(() => {
    if (params.id) {
      productService.getById(params.id).then(item => {
        if (item) setProduct(item);
      });
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0D0907] flex items-center justify-center p-6 text-center text-[#9E8F84]">
        <div className="space-y-4">
          <p className="text-base text-[#F5EDE6]">Item not found in menu.</p>
          <button
            onClick={() => navigate('/menu')}
            className="px-4 py-2 bg-[#D93829] text-white rounded-lg text-xs font-semibold"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const extraShotCost = selectedShot.includes('+₹40') ? 40 : 0;
  const unitPrice = product.price + extraShotCost;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, {
      milk: product.category === 'hot-coffee' || product.category === 'cold-beverages' ? selectedMilk : undefined,
      sugar: product.category === 'hot-coffee' || product.category === 'cold-beverages' ? selectedSugar : undefined,
      shot: product.category === 'hot-coffee' ? selectedShot : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#0D0907] text-[#EDE8E1] pb-24">
      {/* Top back bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/menu')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9E8F84] hover:text-[#EDE8E1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Media & Visual Assets */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] rounded-2xl bg-[#18110D] border border-[#2B1F18] overflow-hidden relative shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0907] via-transparent to-transparent opacity-40" />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#D93829] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Quick Origin / Craft Note */}
            <div className="p-6 rounded-xl bg-[#140E0A] border border-[#261B15] space-y-2 text-xs text-[#9E8F84]">
              <div className="text-[#E2B26C] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Café Coffee Day Guarantee</span>
              </div>
              <p className="leading-relaxed text-[#DDD2C7]">
                Every espresso is pulled from hand-selected beans cultivated on high-altitude estates in Chikmagalur, Karnataka. Roasted to precision in Italian drum roasters and ground fresh for every order.
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-[#140E0A] border border-[#2B1F18] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2 border-b border-[#261B15] pb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9E8F84]">
                {product.categoryName} {product.roastLevel && `· ${product.roastLevel} Roast`}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5EDE6]">
                {product.name}
              </h1>
              <div className="text-2xl font-bold text-[#E2B26C] font-mono tabular-nums pt-1">
                ₹{product.price}
                {product.servingSize && (
                  <span className="text-xs text-[#7A6C62] font-normal font-sans ml-2">
                    ({product.servingSize})
                  </span>
                )}
              </div>
              <p className="text-sm text-[#DDD2C7] leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            {/* Nutrition & Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {product.calories && (
                <div className="p-3 rounded-lg bg-[#18110D] border border-[#261B15]">
                  <span className="text-[#7A6C62] uppercase block text-[10px]">Calories</span>
                  <span className="font-semibold text-[#F5EDE6]">{product.calories} kcal</span>
                </div>
              )}
              {product.dietary && (
                <div className="p-3 rounded-lg bg-[#18110D] border border-[#261B15]">
                  <span className="text-[#7A6C62] uppercase block text-[10px]">Dietary</span>
                  <span className="font-semibold text-[#F5EDE6]">{product.dietary}</span>
                </div>
              )}
              {product.pairing && (
                <div className="col-span-2 p-3 rounded-lg bg-[#18110D] border border-[#261B15]">
                  <span className="text-[#7A6C62] uppercase block text-[10px]">Recommended Pairing</span>
                  <span className="font-semibold text-[#E2B26C]">{product.pairing}</span>
                </div>
              )}
            </div>

            {/* Customization if applicable */}
            {product.customizable && (
              <div className="space-y-4 pt-2 border-t border-[#261B15]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#DDD2C7]">
                  Customize Your Cup
                </div>

                {/* Milk selection */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#9E8F84]">Milk Preference</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Whole Milk', 'Oat Milk', 'Almond Milk', 'Soy Milk'] as const).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMilk(m)}
                        className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                          selectedMilk === m
                            ? 'bg-[#D93829]/15 border-[#D93829] text-[#F5EDE6]'
                            : 'bg-[#18110D] border-[#2A1E17] text-[#9E8F84] hover:text-[#EDE8E1]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sugar */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#9E8F84]">Sweetness</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Normal', 'No Sugar', 'Half Sugar', 'Jaggery'] as const).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSugar(s)}
                        className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                          selectedSugar === s
                            ? 'bg-[#D93829]/15 border-[#D93829] text-[#F5EDE6]'
                            : 'bg-[#18110D] border-[#2A1E17] text-[#9E8F84] hover:text-[#EDE8E1]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Purchase CTA Module */}
            <div className="pt-6 border-t border-[#261B15] space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#3A2E27] rounded-lg bg-[#18110D]">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2.5 text-[#9E8F84] hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-mono font-bold tabular-nums text-[#F5EDE6]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2.5 text-[#9E8F84] hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold rounded-lg text-sm transition-all shadow-lg hover:shadow-red-950/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order</span>
                  </div>
                  <span className="font-mono tabular-nums text-base">₹{totalPrice}</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-[#7A6C62]">
                Prepared freshly for store pickup · Instant counter notification
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
