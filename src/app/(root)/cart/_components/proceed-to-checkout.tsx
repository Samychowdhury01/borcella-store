"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hook/use-cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const ProceedToCheckout = () => {
  const { cartItems } = useCart();

  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("/auth");
      } else {
        const customer = {
          userId: user.id,
          email: user.email,
          name: user?.name,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cartItems, customer }),
        });
        const data = await res.json();
        window.location.href = data.url;
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };
  return (
    <Button onClick={handleCheckout} className="cursor-pointer">
      Proceed to Checkout
    </Button>
  );
};

export default ProceedToCheckout;
