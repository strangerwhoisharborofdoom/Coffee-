import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';
import { X, Trash2, Plus, Minus, Tag, Check, ShoppingBag, MapPin, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    appliedPromo,
    applyPromo,
    removePromo,
    discountAmount,
    gstAmount,
    totalAmount,
    selectedStore,
    setSelectedStore
  } = useCart();
  const { navigate } = useRouter();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCompleteOrder = () => {
    const randomId = 'CCD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderConfirmed(true);
  };

  const handleCloseAndReset = () => {
    setOrderConfirmed(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120C09] border-l border-[#2F221B] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#2A1E17] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D93829]" />
              <h2 className="text-lg font-bold text-[#F5EDE6]">Your Order</h2>
              <span className="text-xs text-[#9E8F84]">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#9E8F84] hover:text-[#EDE8E1] hover:bg-[#1E1510] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {orderConfirmed ? (
            <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1C2C1D] text-[#4ADE80] flex items-center justify-center mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#F5EDE6]">Order Received!</h3>
              <p className="text-sm text-[#DDD2C7]">
                Order <span className="font-mono text-[#D93829] font-bold">{orderId}</span> is being prepared at:
              </p>
              <div className="p-4 rounded-xl bg-[#1C140F] border border-[#2F221B] text-left text-xs space-y-1 w-full">
                <div className="font-semibold text-[#F5EDE6]">{selectedStore.name}</div>
                <div className="text-[#9E8F84]">{selectedStore.address}</div>
                <div className="text-[#C89058] pt-1">Estimated Pickup: 15–20 minutes</div>
              </div>
              <p className="text-xs text-[#9E8F84]">
                Freshly ground and pulled by our master baristas. Show this screen or order ID at the counter.
              </p>
              <button
                onClick={handleCloseAndReset}
                className="w-full py-3 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold rounded-lg text-sm transition-colors"
              >
                Back to Café Coffee Day
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1F1712] flex items-center justify-center text-[#7A6C62]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#F5EDE6]">Your order is empty</h3>
              <p className="text-xs text-[#9E8F84] max-w-xs">
                Explore our signature Chikmagalur coffees, handcrafted frappes, and savory cafe bites.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/menu');
                }}
                className="px-6 py-2.5 bg-[#D93829] hover:bg-[#B92B1D] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              {/* Selected Pickup Store */}
              <div className="px-5 py-3 bg-[#1A120D] border-b border-[#2A1E17] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#DDD2C7] truncate">
                  <MapPin className="w-4 h-4 text-[#D93829] shrink-0" />
                  <span className="truncate">Pickup: <strong>{selectedStore.name}</strong></span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/stores');
                  }}
                  className="text-[#C89058] hover:underline shrink-0 ml-2 font-medium"
                >
                  Change
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg bg-[#18110D] border border-[#2B1F18] flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#F5EDE6] truncate">
                        {item.product.name}
                      </div>
                      <div className="text-xs text-[#9E8F84] mt-0.5">
                        ₹{item.product.price} each
                        {item.customization?.shot && <span> · {item.customization.shot}</span>}
                        {item.customization?.milk && <span> · {item.customization.milk}</span>}
                        {item.customization?.sugar && <span> · {item.customization.sugar}</span>}
                      </div>
                      <div className="text-sm font-bold text-[#E2B26C] tabular-nums mt-2">
                        ₹{item.totalPrice}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#7A6C62] hover:text-[#D93829] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#3A2E27] rounded-md bg-[#120C09]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-[#D93829] text-[#9E8F84]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums text-[#F5EDE6]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-[#D93829] text-[#9E8F84]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Box */}
                <div className="pt-2">
                  {appliedPromo ? (
                    <div className="p-3 rounded-lg bg-[#1B291A] border border-[#2B442A] flex items-center justify-between text-xs text-[#86EFAC]">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code <strong>{appliedPromo}</strong> applied (-₹{discountAmount})</span>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-[#EF4444] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                            placeholder="Enter promo (e.g. FIRSTCUP)"
                            className="w-full bg-[#18110D] border border-[#2F221B] rounded-lg px-3 py-2 text-xs text-[#F5EDE6] placeholder-[#6E6057] uppercase font-mono tracking-wider focus:outline-none focus:border-[#D93829]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-[#251B15] hover:bg-[#34241C] text-[#DDD2C7] text-xs font-semibold rounded-lg border border-[#3A2E27] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <div className="text-[11px] text-[#EF4444]">{promoError}</div>
                      )}
                    </form>
                  )}
                </div>
              </div>

              {/* Order Calculation & Checkout */}
              <div className="p-5 border-t border-[#2A1E17] bg-[#140E0A] space-y-3">
                <div className="space-y-1.5 text-xs text-[#9E8F84]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums text-[#DDD2C7]">₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#4ADE80]">
                      <span>Discount</span>
                      <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5% Restaurant Service)</span>
                    <span className="font-mono tabular-nums text-[#DDD2C7]">₹{gstAmount}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#F5EDE6] pt-2 border-t border-[#2A1E17]">
                    <span>Total Amount</span>
                    <span className="font-mono tabular-nums text-[#D93829]">₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  className="w-full py-3 bg-[#D93829] hover:bg-[#B92B1D] text-white font-semibold rounded-lg text-sm transition-all shadow-lg hover:shadow-red-900/30 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Pickup Order (₹{totalAmount})</span>
                </button>
                <div className="text-center text-[10px] text-[#7A6C62]">
                  Pay at counter or via UPI on collection · Zero cancellation fee within 5 mins
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
