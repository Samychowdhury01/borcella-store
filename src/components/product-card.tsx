import type { TProduct } from "@/types/product-type"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card"
import Image from "next/image"
import Link from "next/link"
import AddToWishlist from "./add-to-wishlist"

interface ProductCardProps {
  product: TProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="md:h-[470px]">
      <Link href={`/products/${product.id}`}>
        <CardContent className="px-0">
          <div className="md:w-[250px] h-[300px] mx-auto flex items-center justify-center">
            <Image
              alt={product.title}
              src={product.media[0] || "/placeholder.svg"}
              width={250}
              height={250}
              className="w-full h-full object-contain"
            />
          </div>
       <div className="px-6">
       <CardTitle className="mt-3 line-clamp-2">{product.title}</CardTitle>
       <CardDescription>{product.category}</CardDescription>
       </div>
        </CardContent>
      </Link>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-bold">${product.price}</p>
          <AddToWishlist productId={product.id} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard

