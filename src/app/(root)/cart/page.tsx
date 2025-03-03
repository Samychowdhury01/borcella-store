"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hook/use-cart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { cartItems, decreaseQuantity, increaseQuantity, removeItem } =
    useCart();

  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
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
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3 font-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cartItems.length === 0 ? (
          <p className="text-body font-bold">No item in cart</p>
        ) : (
          <div>
            {cartItems.map((cartItem) => (
              <div className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between border rounded-lg">
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body font-bold">
                      Product:{cartItem.item.title}
                    </p>
                    {cartItem.color && (
                      <p className="text-small font-medium">
                        Color: {cartItem.color}
                      </p>
                    )}
                    {cartItem.size && (
                      <p className="text-small font-medium">
                        Size: {cartItem.size}
                      </p>
                    )}
                    <p className="text-small font-medium">
                      Price: ${cartItem.item.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-gray-2 cursor-pointer"
                    onClick={() => decreaseQuantity(cartItem.item.id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-gray-2  cursor-pointer"
                    onClick={() => increaseQuantity(cartItem.item.id)}
                  />
                </div>

                <Button
                  variant={"destructive"}
                  size={"icon"}
                  className="cursor-pointer"
                >
                  <Trash onClick={() => removeItem(cartItem.item.id)} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cartItems.length} ${
            cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>$ {totalRounded}</span>
        </div>
        <Button onClick={handleCheckout} className="cursor-pointer">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
