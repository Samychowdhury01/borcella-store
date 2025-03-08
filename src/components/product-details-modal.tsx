"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TProduct } from "@/types/product-type";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import ProductPhotoGallery from "@/app/(root)/products/[productId]/_components/product-photo-gallery";
import ProductInfo from "@/app/(root)/products/[productId]/_components/product-info";

const ProductDetailsModal = ({ product }: { product: TProduct }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-none bg-[#212529] transition-all duration-300 ease-linear cursor-pointer">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-between pt-5">
        <ProductPhotoGallery media={product.media} />
        <ProductInfo productInfo={product} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
