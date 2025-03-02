"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { DropdownMenubar } from "../drop-down-menu";

const Navbar = () => {
  const { userId } = useAuth();
  return (
    <nav className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white">
      {/* logo */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="borcella-store-logo"
          width={130}
          height={100}
        />
      </Link>

      {/* middle items */}
      <div>
        <Link href="/">Home</Link>
      </div>
      {/* cart and user button */}
      <div className="flex items-center gap-x-2">
        <Link
          href="/cart"
          className="flex items-center gap-x-2 px-2 py-1 border border-gray-400 rounded-md hover:text-white hover:bg-black transition-all duration-300 ease-linear"
        >
          <ShoppingCart />
          <p>Cart (0)</p>
        </Link>
        <div>{userId && <DropdownMenubar />}</div>
        <div>
          {userId ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">
              <CircleUserRound />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
