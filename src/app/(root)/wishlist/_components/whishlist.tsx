import { getWishlistItems } from "@/actions/wishlist-action";
import { auth } from "@/auth";
import ProductCard from "@/components/product-card";
import { TProduct } from "@/types/product-type";

import { redirect } from "next/navigation";

export default async function Wishlist() {
  const session = await auth();
      const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }
  const wishlistItems = await getWishlistItems(userId);
console.log(wishlistItems)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {wishlistItems.length !== 0 &&
        wishlistItems.map((item: TProduct) => (
          <ProductCard key={item.id} product={item} />
        ))}
      {wishlistItems.length === 0 && (
        <p className="text-destructive font-semibold">
          No wishlist item available.
        </p>
      )}
    </div>
  );
}
