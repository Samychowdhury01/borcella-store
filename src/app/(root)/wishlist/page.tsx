import { Suspense } from "react";
import { WishlistSkeleton } from "./_components/wishlist-skeleton";
import Wishlist from "./_components/whishlist";
import { Section } from "@/components/responsive-section";
import SectionBanner from "../_components/section-banner";

export default function WishlistPage() {
  return (
    <main>
      <SectionBanner title="Wishlist" />
      <Section className="pb-[40px] sm:pb-[60px] md:pb-[80px] lg:pb-[120px] xl:pb-[140px]">
        <Suspense fallback={<WishlistSkeleton />}>
          <Wishlist />
        </Suspense>
      </Section>
    </main>
  );
}
