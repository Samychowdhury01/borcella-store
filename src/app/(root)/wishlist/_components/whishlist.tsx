"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/product-card";
import type { TProduct } from "@/types/product-type";
import { Loader2 } from "lucide-react";
import useWishlist from "@/hook/use-wishlist";

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
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item: TProduct) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="text-destructive font-semibold col-span-full">
            No wishlist items available.
          </p>
        )}
      </div>
    </div>
  );
}
