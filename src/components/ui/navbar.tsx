"use client";
import Image from "next/image";
import Link from "next/link";

import { CircleUserRound, ShoppingCart } from "lucide-react";
import { DropdownMenubar } from "../drop-down-menu";
import useCart from "@/hook/use-cart";
import NavbarRoutes from "../navbar-routes";
import SearchBox from "./search-box";
import { useSession } from "next-auth/react";
import { SignOut } from "../sign-out";
import { Button } from "./button";

const Navbar = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { cartItems } = useCart();

  return (
    <nav className="sticky top-0 z-20 py-5 px-10  bg-secondary text-white max-sm:px-2">
      <div className="mx-auto md:max-w-7xl flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="borcella-store-logo"
            width={130}
            height={100}
            className="w-[250px]"
          />
        </Link>

        <div className="flex items-center gap-3">
          {/* middle items will be hidden it the small device*/}
          <div className="max-lg:hidden">
            <NavbarRoutes />
          </div>
        </div>
        {/* cart and user button */}
        <div className="flex items-center gap-x-2">
          <Button
            asChild
            variant={"ghost"}
            className="hover:text-primary group transition-all duration-300 ease-linear"
          >
            <Link
              href="/cart"
              className="lg:block hidden relative hover:text-primary hover:bg-transparent"
            >
              <ShoppingCart className="size-5 " />
              {cartItems.length > 0 && <p className="text-[10px] bg-primary text-center rounded-full h-4 w-4 absolute top-0 right-0 group-hover:text-secondary-foreground group-hover:bg-primary transition-all duration-200 ease-in-out">
                {cartItems.length}
              </p>}
            </Link>
          </Button>

          <div className="lg:hidden">
            <DropdownMenubar />
          </div>
          <div>
            {userId ? (
              <SignOut />
            ) : (
              <Button
                asChild
                variant={"ghost"}
                className="hover:text-primary hover:bg-transparent"
              >
                <Link href="/auth">
                  <CircleUserRound className="size-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
