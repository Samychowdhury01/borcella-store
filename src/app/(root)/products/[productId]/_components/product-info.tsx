"use client";
import AddToWishlist from "@/components/add-to-wishlist";
import { Button } from "@/components/ui/button";
import useCart from "@/hook/use-cart";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product-type";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

const ProductInfo = ({ productInfo }: { productInfo: TProduct }) => {
  const [selectedColor, setSelectedColor] = useState(productInfo.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productInfo.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart();
  //   quantity handle
  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    }
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="w-full max-w-[400px] flex flex-col gap-4 p-3">
      <div className="flex items-center justify-between">
        <p className="text-heading3 font-bold">{productInfo.title}</p>
        <AddToWishlist productId={productInfo.id} />
      </div>
      {/* category */}
      <div className="flex gap-2">
        <p className="text-base font-medium text-gray-2 "> Category:</p>
        <p className="text-base font-bold ">{productInfo.category}</p>
      </div>
      <p className="text-heading3 font-bold">{productInfo.price} USD</p>

      {/* description */}
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium text-gray-2 "> Description:</p>
        <p className="text-small font-medium">{productInfo.description}</p>
      </div>
      {/* colors */}
      {productInfo.colors.length !== 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-gray-2">Colors:</p>
          <div className="flex gap-2">
            {productInfo?.colors.map((color, index) => (
              <p
                key={index}
                className={cn(
                  "border border-black px-2 py-1 rounded-md cursor-pointer ",
                  selectedColor === color && "bg-black text-white"
                )}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}
      {/* sizes */}
      {productInfo.sizes.length !== 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-gray-2">Sizes:</p>
          <div className="flex gap-2">
            {productInfo?.sizes.map((size, index) => (
              <p
                key={index}
                className={cn(
                  "border border-black px-2 py-1 rounded-md cursor-pointer ",
                  selectedSize === size && "bg-black text-white"
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium text-gray-2 ">Quantity:</p>
        <div className="flex gap-4 items-center w-1/2">
          <button
            onClick={() => handleQuantity("decrease")}
            className="cursor-pointer"
          >
            <MinusCircleIcon />
          </button>
          <p className="text-body font-bold">{quantity}</p>
          <button
            onClick={() => handleQuantity("increase")}
            className="cursor-pointer"
          >
            <PlusCircleIcon />
          </button>
        </div>
      </div>
      {/* add to cart */}
      <Button
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductInfo;
