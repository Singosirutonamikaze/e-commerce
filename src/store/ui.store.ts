import { create } from "zustand";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "danger" | "warning" | "info";
}

interface UIStore {
  isCartDrawerOpen: boolean;
  isChatWindowOpen: boolean;
  toasts: Toast[];
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  openChatWindow: () => void;
  closeChatWindow: () => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  isCartDrawerOpen: false,
  isChatWindowOpen: false,
  toasts: [],
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () =>
    set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  openChatWindow: () => set({ isChatWindowOpen: true }),
  closeChatWindow: () => set({ isChatWindowOpen: false }),
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => get().removeToast(id), 5000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
