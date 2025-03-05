"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useTransition } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const AddToWishlist = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user?.id;
  const [signInUser, setSignInUser] = useState<User | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, startTransition] = useTransition();

  const getUser = () => {
    startTransition(async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setSignInUser(data.data);
        setIsLiked(data?.data?.wishlist?.includes(productId));
      }
    });
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  //   handle like button click to add or remove product from wishlist
  const handleLike = async () => {
    if (!userId) {
      toast.error("You need to sign-in to add to your wishlist");
      router.push("/auth");
    }
    startTransition(async () => {
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId }),
      });
      const updatedUser = await res.json();

      if (updatedUser.success) {
        const isProductIdInExistInWishlist =
          updatedUser?.data?.wishlist?.includes(productId);
        toast.success(
          isProductIdInExistInWishlist
            ? "Successfully added to the wishlist"
            : "Successfully removed from the wishlist"
        );
        setSignInUser(updatedUser.data);
        setIsLiked(isProductIdInExistInWishlist);
        router.refresh();
      }
    });
  };
  return (
    <Button variant="ghost" onClick={handleLike} disabled={loading}>
      <Heart
        className="h-7 w-7"
        fill={`${isLiked ? "red" : "white"}`}
        stroke={isLiked ? "red" : "black"}
      />
    </Button>
  );
};

export default AddToWishlist;
