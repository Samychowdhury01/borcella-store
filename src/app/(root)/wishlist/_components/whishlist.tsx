"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { TProduct } from "@/types/product-type";
import { Loader2 } from "lucide-react";
import useWishlist from "@/hook/use-wishlist";
import WishlistProductTable from "./wishlist-table";

export default function Wishlist() {
  const router = useRouter();
  const { wishlistItems } = useWishlist();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlistProducts = async () => {
    try {
      setLoading(true);

      if (wishlistItems.length === 0) {
        setProducts([]);
        return;
      }

      const productPromises = wishlistItems.map(async (productId: string) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
          );

          if (!response.ok) {
            console.error(
              `Failed to fetch product ${productId}:`,
              response.statusText
            );
            return null;
          }

          const product = await response.json();

          if (!product?.success) {
            console.warn(`Product fetch unsuccessful for ID: ${productId}`);
            return null;
          }

          return product.data;
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          return null;
        }
      });

      const productResults = await Promise.all(productPromises);
      const validProducts = productResults.filter(
        (product): product is TProduct => product !== null
      );

      setProducts(validProducts);
    } catch (error) {
      console.error("Error in fetchWishlistProducts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch product details for wishlist items
    fetchWishlistProducts();
  }, [wishlistItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {products.length !== 0 && <WishlistProductTable products={products} />}
    </div>
  );
}
