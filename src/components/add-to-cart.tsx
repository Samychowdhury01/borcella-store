"use client";
import { TProduct } from "@/types/product-type";
import React from "react";
import { Button } from "./ui/button";
import useCart from "@/hook/use-cart";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
  productInfo: TProduct;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

const AddToCart = ({
  productInfo,
  quantity,
  selectedColor,
  selectedSize,
}: AddToCartProps) => {
  const cart = useCart();
  return (
    <Button
    className="rounded-none bg-[#212529] transition-all duration-300 ease-linear cursor-pointer"
      onClick={() => {
        cart.addItem({
          item: productInfo,
          quantity: quantity,
          color: selectedColor,
          size: selectedSize,
        });
      }}
    >
      <ShoppingCart />
    </Button>
  );
};

export default AddToCart;
