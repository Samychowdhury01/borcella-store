import { create } from "zustand"
import toast from "react-hot-toast"
import { persist, createJSONStorage } from "zustand/middleware"

interface WishlistStore {
  wishlistItems: string[] // Array of product IDs
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  toggleItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const useWishlist = create(
  persist<WishlistStore>(
    (set, get) => ({
      wishlistItems: [],

      addItem: (productId: string) => {
        const currentItems = get().wishlistItems
        if (currentItems.includes(productId)) {
          return toast.error("Item already in wishlist")
        }
        set({ wishlistItems: [...currentItems, productId] })
        toast.success("Added to wishlist")
      },

      removeItem: (productId: string) => {
        const currentItems = get().wishlistItems
        set({
          wishlistItems: currentItems.filter((id) => id !== productId),
        })
        toast.success("Removed from wishlist")
      },

      toggleItem: (productId: string) => {
        const currentItems = get().wishlistItems
        const isInWishlist = currentItems.includes(productId)

        if (isInWishlist) {
          set({
            wishlistItems: currentItems.filter((id) => id !== productId),
          })
          toast.success("Removed from wishlist")
        } else {
          set({ wishlistItems: [...currentItems, productId] })
          toast.success("Added to wishlist")
        }
      },

      isInWishlist: (productId: string) => {
        return get().wishlistItems.includes(productId)
      },

      clearWishlist: () => set({ wishlistItems: [] }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useWishlist

