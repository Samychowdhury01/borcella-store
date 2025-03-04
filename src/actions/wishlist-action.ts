import prisma from "@/lib/prisma";
import { getProductDetails } from "./product-actions";

export const getWishlistItems = async (clerkId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
  if (!user) {
    return [];
  }
  // Fetch all product details in parallel
  const wishlistProducts = await Promise.all(
    user.wishlist.map(async (productId) => {
      try {
        return await getProductDetails(productId);
      } catch (error) {
        console.error(`Failed to fetch product ${productId}:`, error);
        return null;
      }
    })
  );

  // Filter out null values (failed requests)
  const filteredWishlist = wishlistProducts.filter(Boolean);
  return filteredWishlist;
};
