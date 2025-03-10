"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hook/use-cart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/responsive-section";
import SectionBanner from "../../_components/section-banner";
import ProceedToCheckout from "./proceed-to-checkout";

const CartComponent = () => {
  const { cartItems, decreaseQuantity, increaseQuantity, removeItem } =
    useCart();

  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));
  return (
    <>
      <SectionBanner title="Your Cart" />
      <Section className="responsive-section-bottom">
        <div className="flex gap-20 max-lg:flex-col">
          <div className="w-2/3 max-lg:w-full">
            <p className="text-heading3 font-bold">Shopping Cart</p>
            <hr className="my-6" />

            {cartItems.length === 0 ? (
              <p className="text-body font-bold">No item in cart</p>
            ) : (
              <div className="flex flex-col items-center gap-5">
                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="w-full flex max-sm:flex-col max-sm:gap-3 px-4 py-3 items-center max-sm:items-start justify-between border rounded-lg bg-muted"
                  >
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
                          Product: {cartItem.item.title}
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
                      <button
                        disabled={cartItem.quantity === 0}
                        onClick={() => decreaseQuantity(cartItem.item.id)}
                      >
                        <MinusCircle className="hover:text-gray-2 cursor-pointer size-5" />
                      </button>
                      <p className="text-body-bold">{cartItem.quantity}</p>
                      <button
                        onClick={() => increaseQuantity(cartItem.item.id)}
                      >
                        <PlusCircle className="hover:text-gray-2 cursor-pointer size-5" />
                      </button>
                    </div>

                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      className="cursor-pointer"
                      onClick={() => removeItem(cartItem.item.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length !== 0 && (
            <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5  shadow-xl h-fit md:mt-10 sticky top-20">
              <p className="text-heading4 font-bold pb-4">
                Summary{" "}
                <span>{`(${cartItems.length} ${
                  cartItems.length > 1 ? "items" : "item"
                })`}</span>
              </p>
              <div className="flex justify-between text-body font-semibold">
                <span>Total Amount</span>
                <span>$ {totalRounded}</span>
              </div>
              <ProceedToCheckout />
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default CartComponent;
