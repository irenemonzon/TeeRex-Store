import { create } from 'zustand';
import { persist,type PersistStorage } from 'zustand/middleware';
import type { Product, CartItem } from '../types';

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCartQuantity: () => number;
}

const sessionStorageProvider: PersistStorage<CartStore> = {
  getItem: async (name) => {
    const value = sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    sessionStorage.removeItem(name);
  },
};

export const useCartStore = create<CartStore>()(
  persist(
  (set, get) => ({
  cart: [],

  addToCart: (product) => {
    const { id, price } = product;
    const existing = get().cart.find((item) => item.id === id);

    if (existing) {
      const updated = get().cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantityTotalCart: item.quantityTotalCart + 1,
              subtotal: price * (item.quantityTotalCart + 1),
            }
          : item
      );
      set({ cart: updated });
    } else {
      set({
        cart: [
          ...get().cart,
          {
            ...product,
            quantityTotalCart: 1,
            subtotal: price,
          },
        ],
      });
    }
  },

  increaseQuantity: (id) => {
    const updated = get().cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantityTotalCart: item.quantityTotalCart + 1,
            subtotal: item.price * (item.quantityTotalCart + 1),
          }
        : item
    );
    set({ cart: updated });
  },

  decreaseQuantity: (id) => {
    const updated = get().cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantityTotalCart: item.quantityTotalCart - 1,
              subtotal: item.price * (item.quantityTotalCart - 1),
            }
          : item
      )
      .filter((item) => item.quantityTotalCart > 0);
    set({ cart: updated });
  },

  removeItem: (id) => {
    set({ cart: get().cart.filter((item) => item.id !== id) });
  },

  clearCart: () => {
    set({ cart: [] });
  },

  getTotal: () => {
    return get().cart.reduce((acc, item) => acc + item.subtotal, 0);
  },
  getCartQuantity: () => {
  return get().cart.reduce((total, item) => total + item.quantityTotalCart, 0);
}
}),
    {
    name: 'teerex-cart-session',
    storage: sessionStorageProvider,
    }
  )
);
