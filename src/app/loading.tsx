import { ShoppingCart } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <div className="text-center">
        <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
        <h2 className="text-2xl font-semibold mb-2">Loading your shop</h2>
        <p className="text-muted-foreground">Please wait while we prepare your shopping experience...</p>
      </div>
    </div>
  )
}

