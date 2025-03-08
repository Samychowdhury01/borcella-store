import { create } from "zustand";
import toast from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { TProduct } from "@/types/product-type";

interface CartItem {
  item: TProduct;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        // all the items already in the cart
        const currentItems = get().cartItems;
        const existingItems = currentItems.find(
          (cartItem) => cartItem.item.id === item.id
        );
        if (existingItems) {
          return toast.error("Item already exist in the cart!");
        }
        set({
          cartItems: [...currentItems, data],
        });
        toast.success("Item added successfully!");
      },
      removeItem: (itemId: String) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item.id !== itemId
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (itemId: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },
      decreaseQuantity: (itemId: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item.id === itemId
            ? {
                ...cartItem,
                quantity: cartItem.quantity === 0 ? 0 : cartItem.quantity - 1,
              }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity decreased");
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useCart;
