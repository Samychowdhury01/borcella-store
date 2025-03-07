import type { TProduct } from "@/types/product-type"
import { Card, CardContent, CardFooter } from "./ui/card"
import Image from "next/image"
import Link from "next/link"
import AddToWishlist from "./add-to-wishlist"
import { Heart } from 'lucide-react'

interface ProductCardProps {
  product: TProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden  shadow-md hover:shadow-lg hover:border hover:border-primary transition-all duration-300 bg-white py-0 min-w-[200px]">
      <Link href={`/products/${product.id}`} className="block h-full">
         {/* Image container with hover effect */}
         <div className="relative w-full aspect-square overflow-hidden bg-[#FFF5ED]">
            <Image
              alt={product.title}
              src={product.media[0] || "/placeholder.svg?height=300&width=300"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105 "
            />
            
            {/* Wishlist button positioned on the image */}
            <div className="absolute top-3 right-3 z-10">
              <AddToWishlist productId={product.id} />
            </div>
          </div>
        <CardContent className="p-0 relative">
         
          
          {/* Product info with gradient overlay */}
          <div className="p-4 space-y-2">
            <div className="text-xs font-medium text-[oklch(86.85%_0.186_135.03)] uppercase tracking-wider">
              {product.category}
            </div>
            <h3 className="font-medium text-[oklch(21.34%_0.000_0)] line-clamp-2 text-sm sm:text-base">
              {product.title}
            </h3>
          </div>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
          <p className="text-lg font-bold text-secondary-foreground">
            ${product.price}
          </p>
          <span className="text-xs px-3 py-1 rounded-full bg-primary text-secondary-foreground font-medium">
            View Details
          </span>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ProductCard
