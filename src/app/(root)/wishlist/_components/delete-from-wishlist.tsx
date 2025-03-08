"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import useWishlist from "@/hook/use-wishlist";
const DeleteFromWishlist = ({ itemId }: { itemId: string }) => {
  const { removeItem } = useWishlist();
  return (
    <Button
      variant={"destructive"}
      className="rounded-none"
      onClick={() => removeItem(itemId)}
    >
      <Trash />
    </Button>
  );
};

export default DeleteFromWishlist;
