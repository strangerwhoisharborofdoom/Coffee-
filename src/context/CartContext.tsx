import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Store } from '../types';
import { STORES_DATA } from '../data/stores';
import { OFFERS_DATA } from '../data/stories';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, customization?: CartItem['customization']) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  discountAmount: number;
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  selectedStore: Store;
  setSelectedStore: (store: Store) => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ccd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store>(STORES_DATA[0]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ccd_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // Clear toast notification automatically
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addItem = (product: Product, quantity = 1, customization?: CartItem['customization']) => {
    const extraPrice = customization?.shot?.includes('+₹40') ? 40 : 0;
    const unitPrice = product.price + extraPrice;
    
    // Create custom signature for identifying duplicate customized items
    const customSig = customization ? JSON.stringify(customization) : 'default';
    const existingIndex = items.findIndex(
      it => it.productId === product.id && (it.customization ? JSON.stringify(it.customization) : 'default') === customSig
    );

    if (existingIndex > -1) {
      const newItems = [...items];
      newItems[existingIndex].quantity += quantity;
      newItems[existingIndex].totalPrice = newItems[existingIndex].quantity * unitPrice;
      setItems(newItems);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        product,
        quantity,
        customization,
        totalPrice: unitPrice * quantity
      };
      setItems(prev => [newItem, ...prev]);
    }

    setNotification(`Added "${product.name}" to your order.`);
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const extraPrice = item.customization?.shot?.includes('+₹40') ? 40 : 0;
          return {
            ...item,
            quantity: newQty,
            totalPrice: newQty * (item.product.price + extraPrice)
          };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo === 'FIRSTCUP' && subtotal >= 199) {
      discountAmount = 50;
    } else if (appliedPromo === 'ESTATEBEAN' && subtotal >= 800) {
      discountAmount = Math.round(subtotal * 0.15);
    } else if (appliedPromo === 'FRAPPE4TO7') {
      discountAmount = 40;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  // Standard Indian restaurant GST is 5% on food and non-alcoholic beverages
  const gstAmount = Math.round(taxableAmount * 0.05);
  const totalAmount = taxableAmount + gstAmount;

  const applyPromo = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const offer = OFFERS_DATA.find(o => o.code === formatted);
    if (!offer) {
      return { success: false, message: 'Invalid coupon code. Try FIRSTCUP or ESTATEBEAN' };
    }
    if (offer.minOrder && subtotal < offer.minOrder) {
      return { success: false, message: `Minimum cart value of ₹${offer.minOrder} required for ${formatted}` };
    }
    setAppliedPromo(formatted);
    return { success: true, message: `Applied ${formatted} successfully!` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedPromo,
        applyPromo,
        removePromo,
        discountAmount,
        subtotal,
        gstAmount,
        totalAmount,
        selectedStore,
        setSelectedStore,
        notification,
        setNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
