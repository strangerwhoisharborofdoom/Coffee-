import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { X, Check, Plus, Minus, Coffee, Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Soy Milk'>('Whole Milk');
  const [selectedSugar, setSelectedSugar] = useState<'Normal' | 'No Sugar' | 'Half Sugar' | 'Jaggery'>('Normal');
  const [selectedShot, setSelectedShot] = useState<'Single Shot' | 'Double Shot (+₹40)'>('Single Shot');

  if (!product) return null;

  const extraShotCost = selectedShot.includes('+₹40') ? 40 : 0;
  const unitPrice = product.price + extraShotCost;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, {
      milk: product.category === 'hot-coffee' || product.category === 'cold-beverages' ? selectedMilk : undefined,
      sugar: product.category === 'hot-coffee' || product.category === 'cold-beverages' ? selectedSugar : undefined,
      shot: product.category === 'hot-coffee' ? selectedShot : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-[#140E0A] border border-[#2F221B] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        {/* Modal Header Media */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#1E1510] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A] via-[#140E0A]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-[#DDD2C7] hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-[#E2B26C] font-semibold uppercase tracking-wider mb-1">
              <span>{product.categoryName}</span>
              {product.badge && <span>· {product.badge}</span>}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5EDE6]">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description & Specs */}
          <div className="space-y-3">
            <p className="text-sm text-[#DDD2C7] leading-relaxed">
              {product.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              {product.roastLevel && (
                <div className="p-2.5 rounded-lg bg-[#1D140E] border border-[#2B1E17]">
                  <div className="text-[#9E8F84] text-[10px] uppercase">Roast Profile</div>
                  <div className="font-semibold text-[#F5EDE6]">{product.roastLevel} Roast</div>
                </div>
              )}
              {product.servingSize && (
                <div className="p-2.5 rounded-lg bg-[#1D140E] border border-[#2B1E17]">
                  <div className="text-[#9E8F84] text-[10px] uppercase">Portion Size</div>
                  <div className="font-semibold text-[#F5EDE6]">{product.servingSize}</div>
                </div>
              )}
              {product.calories && (
                <div className="p-2.5 rounded-lg bg-[#1D140E] border border-[#2B1E17]">
                  <div className="text-[#9E8F84] text-[10px] uppercase">Energy</div>
                  <div className="font-semibold text-[#F5EDE6]">{product.calories} kcal</div>
                </div>
              )}
              {product.pairing && (
                <div className="p-2.5 rounded-lg bg-[#1D140E] border border-[#2B1E17]">
                  <div className="text-[#9E8F84] text-[10px] uppercase">Ideal Pairing</div>
                  <div className="font-semibold text-[#E2B26C] truncate">{product.pairing}</div>
                </div>
              )}
            </div>
          </div>

          {/* Customization Options (if beverage) */}
          {product.customizable && (
            <div className="space-y-4 pt-4 border-t border-[#261B15]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#DDD2C7] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D93829]" />
                <span>Barista Customization</span>
              </div>

              {/* Milk Option */}
              <div className="space-y-2">
                <label className="text-xs text-[#9E8F84]">Milk Choice</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Whole Milk', 'Oat Milk', 'Almond Milk', 'Soy Milk'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMilk(m)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-colors ${
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

              {/* Sugar Option */}
              <div className="space-y-2">
                <label className="text-xs text-[#9E8F84]">Sweetness Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Normal', 'Half Sugar', 'No Sugar', 'Jaggery'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSugar(s)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-colors ${
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

              {/* Shot Option */}
              {product.category === 'hot-coffee' && (
                <div className="space-y-2">
                  <label className="text-xs text-[#9E8F84]">Espresso Extraction</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Single Shot', 'Double Shot (+₹40)'] as const).map((sh) => (
                      <button
                        key={sh}
                        type="button"
                        onClick={() => setSelectedShot(sh)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
                          selectedShot === sh
                            ? 'bg-[#D93829]/15 border-[#D93829] text-[#F5EDE6]'
                            : 'bg-[#18110D] border-[#2A1E17] text-[#9E8F84] hover:text-[#EDE8E1]'
                        }`}
                      >
                        {sh}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Ingredients & Allergens */}
          <div className="space-y-2 pt-4 border-t border-[#261B15] text-xs text-[#9E8F84]">
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <strong className="text-[#DDD2C7]">Ingredients: </strong>
                {product.ingredients.join(', ')}
              </div>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <div className="text-[#C89058] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Allergens: {product.allergens.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Buy Bar */}
        <div className="p-5 border-t border-[#261B15] bg-[#100B08] flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[#3A2E27] rounded-lg bg-[#18110D]">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-2 text-[#9E8F84] hover:text-white"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm font-mono font-bold tabular-nums text-[#F5EDE6]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="p-2 text-[#9E8F84] hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold rounded-lg text-sm transition-all shadow-lg hover:shadow-red-950/40 flex items-center justify-between"
          >
            <span>Add to Order</span>
            <span className="font-mono tabular-nums text-base">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
