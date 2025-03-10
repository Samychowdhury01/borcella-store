import { Metadata } from "next";
import CartComponent from "./_components/cart-component";

export const generateMetadata = (): Metadata => {
  return {
    title: "Cart",
    description: "Here you will find the products user added to their cart.",
  };
};

const CartPage = () => {
  return <CartComponent />;
};

export default CartPage;
