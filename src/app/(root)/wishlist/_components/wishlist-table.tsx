"use client";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddToCart from "@/components/add-to-cart";
import { TProduct } from "@/types/product-type";
import DeleteFromWishlist from "./delete-from-wishlist";

export default function WishlistProductTable({ products }: { products: TProduct[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: TProduct) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="relative w-[130px] h-[130px]">
                  <Image
                    src={product.media[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-x-2">
                  <AddToCart
                    productInfo={product}
                    quantity={1}
                    selectedColor={product.colors[0]}
                    selectedSize={product.sizes[0]}
                  />
                  <DeleteFromWishlist itemId={product.id}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
