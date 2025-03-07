"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import useWishlist from "@/hook/use-wishlist";

const AddToWishlist = ({ productId }: { productId: string }) => {
  const router = useRouter();

  const [loading, startTransition] = useTransition();

  // Use our new Zustand wishlist hook
  const { isInWishlist, toggleItem } = useWishlist();
  const isLiked = isInWishlist(productId);

  // Handle like button click to add or remove product from wishlist
  const handleLike = () => {
    startTransition(() => {
      toggleItem(productId);
      router.refresh();
    });
  };

  return (
    <Button variant="ghost" onClick={handleLike} disabled={loading} className="hover:bg-transparent cursor-pointer">
      <Heart
        className="h-7 w-7"
        fill={`${isLiked ? "red" : "white"}`}
        stroke={isLiked ? "red" : "black"}
      />
    </Button>
  );
};

export default AddToWishlist;
