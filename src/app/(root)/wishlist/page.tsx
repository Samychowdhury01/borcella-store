import { Suspense } from "react";
import { WishlistSkeleton } from "./_components/wishlist-skeleton";
import Wishlist from "./_components/whishlist";
import { Section } from "@/components/responsive-section";
import SectionBanner from "../_components/section-banner";
import { Metadata } from "next";

export const  generateMetadata = (): Metadata =>{
return {
  title : "Wishlist",
  description: "Here you will find the products user added to their wishlist"
}
}

export default function WishlistPage() {
  return (
    <main>
      <SectionBanner title="Wishlist" />
      <Section className="responsive-section-bottom">
        <Suspense fallback={<WishlistSkeleton />}>
          <Wishlist />
        </Suspense>
      </Section>
    </main>
  );
}
