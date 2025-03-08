import type { TProduct } from "@/types/product-type";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToWishlist from "./add-to-wishlist";
import AddToCart from "./add-to-cart";
import ProductDetailsModal from "./product-details-modal";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden  bg-white py-0 min-w-[200px] rounded-none border-none ">
      {/* Image container with hover effect */}
      <div className="relative w-full aspect-square overflow-hidden">
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

        <div className=" absolute left-0 right-0 bottom-8 m-auto flex items-center justify-center  duration-300 transition-all ease-linear opacity-0 group-hover:opacity-100">
          <AddToCart
            productInfo={product}
            quantity={1}
            selectedColor={product.colors[0]}
            selectedSize={product.sizes[0]}
          />
          <ProductDetailsModal product={product} />
        </div>
      </div>
      <CardContent className="p-0 relative">
        {/* Product info with gradient overlay */}
        <div className="p-4 space-y-2">
          <div className="text-xs font-medium text-accent-foreground uppercase tracking-wider">
            {product.category}
          </div>

          <Link
            href={`/products/${product.id}`}
            className="hover:text-primary duration-300 transition-all ease-in-out text-product-heading font-lora font-bold line-clamp-1"
          >
            {product.title}
          </Link>

          <p className="text-lg font-bold text-primary pt-2">
            ${product.price}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
