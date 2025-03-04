import { Suspense } from "react"
import { WishlistSkeleton } from "./_components/wishlist-skeleton"
import Wishlist from "./_components/whishlist"


export default function WishlistPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <Suspense fallback={<WishlistSkeleton />}>
        <Wishlist />
      </Suspense>
    </main>
  )
}

