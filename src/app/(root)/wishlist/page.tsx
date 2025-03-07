import { Suspense } from "react";
import { WishlistSkeleton } from "./_components/wishlist-skeleton";
import Wishlist from "./_components/whishlist";
import { Section } from "@/components/responsive-section";

export default function WishlistPage() {
  return (
    <main>
      <Section>
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <Suspense fallback={<WishlistSkeleton />}>
          <Wishlist />
        </Suspense>
      </Section>
    </main>
  );
}
