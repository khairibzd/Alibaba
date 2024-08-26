import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

import { Product } from "@prisma/client";

export interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from the cart");
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: {
        getItem: (name) => {
          const cookie = Cookies.get(name);
          return cookie ? JSON.parse(cookie) : { state: { items: [] } };
        },
        setItem: (name, value) => {
          Cookies.set(name, JSON.stringify(value), { expires: 7 });
        },
        removeItem: (name) => {
          Cookies.remove(name);
        },
      },
    }
  )
);

export default useCart;
