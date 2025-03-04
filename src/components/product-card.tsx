import { TProduct } from "@/types/product-type";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToWishlist from "./add-to-wishlist";
interface ProductCardProps {
  product: TProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <Link href={`/products/${product.id}`}>
        <CardContent>
          <div className="w-[250px] h-[300px]">
            <Image
              alt={product.title}
              src={product.media[0]}
              width={250}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="mt-3">{product.title}</CardTitle>
          <CardDescription>{product.category}</CardDescription>
        </CardContent>
      </Link>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-bold">${product.price}</p>
          <AddToWishlist productId={product.id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
