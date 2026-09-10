import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  produitId: string;
  nom: string;
  prix: number;
  image: string;
  quantite: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantite: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const normalizedItem: CartItem = {
          ...newItem,
          // Keep a stable id across sessions to avoid duplicated logical items.
          id: newItem.produitId,
        };
        const existingItem = get().items.some(
          (item) => item.produitId === normalizedItem.produitId,
        );
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.produitId === normalizedItem.produitId
                ? {
                    ...item,
                    quantite: Math.min(
                      item.quantite + normalizedItem.quantite,
                      item.stock,
                    ),
                  }
                : item,
            ),
          });
        } else {
          set({ items: [...get().items, normalizedItem] });
        }
      },
      removeItem: (id) => {
        set({
          items: get().items.filter(
            (item) => item.id !== id && item.produitId !== id,
          ),
        });
      },
      updateQuantity: (id, quantite) => {
        set({
          items: get().items.map((item) =>
            item.id === id || item.produitId === id
              ? {
                  ...item,
                  quantite: Math.max(1, Math.min(quantite, item.stock)),
                }
              : item,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantite, 0),
      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.prix * item.quantite, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
);
