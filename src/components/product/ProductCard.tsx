import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';
import { Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addItem } = useCart();
  const { navigate } = useRouter();

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#140E0A] rounded-xl border border-[#2B1F18] hover:border-[#D93829]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Media Slot */}
      <div className="relative aspect-[4/3] bg-[#1A120D] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A] via-transparent to-transparent opacity-60" />

        {/* Badge (max 1) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#D93829] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
            {product.badge}
          </div>
        )}

        {/* Quick View overlay hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <span className="px-3 py-1.5 rounded-lg bg-[#0D0907]/90 text-white text-xs font-medium flex items-center gap-1.5 shadow">
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </span>
        </div>
      </div>

      {/* Content Slot */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="text-[11px] font-medium tracking-wider uppercase text-[#9E8F84]">
            {product.categoryName}
            {product.roastLevel && <span> · {product.roastLevel} Roast</span>}
          </div>
          <h3 className="font-semibold text-base text-[#F5EDE6] group-hover:text-[#D93829] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-[#9E8F84] line-clamp-2 leading-relaxed pt-0.5">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#231710] flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-[#E2B26C] font-mono tabular-nums">
              ₹{product.price}
            </span>
            {product.servingSize && (
              <span className="text-[11px] text-[#7A6C62] ml-1.5">
                / {product.servingSize}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-3 py-1.5 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
