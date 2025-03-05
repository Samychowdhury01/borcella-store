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

const Navbar = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { cartItems } = useCart();

  return (
    <nav className="sticky top-0 z-10 py-2 px-10  bg-white max-sm:px-2">
      <div className="mx-auto md:max-w-7xl flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="borcella-store-logo"
            width={130}
            height={100}
          />
        </Link>

        <div className="flex items-center gap-3">
          {/* middle items will be hidden it the small device*/}
          <div className="max-lg:hidden">
            <NavbarRoutes />
          </div>
          {/* search box */}
          <SearchBox />
        </div>
        {/* cart and user button */}
        <div className="flex items-center gap-x-2">
          <Link
            href="/cart"
            className="lg:flex items-center gap-x-2 px-2 py-1 border border-gray-400 rounded-md hover:text-white hover:bg-black transition-all duration-300 ease-linear hidden"
          >
            <ShoppingCart />
            <p>Cart ({cartItems.length})</p>
          </Link>
          <div className="lg:hidden">
            <DropdownMenubar />
          </div>
          <div>
            {userId ? (
              <SignOut />
            ) : (
              <Link href="/auth">
                <CircleUserRound />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
