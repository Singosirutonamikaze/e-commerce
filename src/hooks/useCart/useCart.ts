'use client';

import { useCartStore, CartItem,useUIStore } from '@/store';

export function useCart() {
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice,
  } = useCartStore();
  
  const { openCartDrawer } = useUIStore();

  const addToCartWithDrawer = (item: CartItem) => {
    addItem(item);
    openCartDrawer();
  };

  return {
    items,
    addItem: addToCartWithDrawer,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: totalItems(), // Changed to call the function
    subTotal: totalPrice(),
    isEmpty: items.length === 0,
  };
}
