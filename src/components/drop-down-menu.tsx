"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ShoppingCart } from "lucide-react";
import { routes } from "./navbar-routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useCart from "@/hook/use-cart";
import { useSession } from "next-auth/react";

export function DropdownMenubar() {
  const { cartItems } = useCart();
  const session = useSession();
    const userId = session.data?.user?.id;
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {routes.map((route, index) => (
          <DropdownMenuItem key={index}>
            <Link
              href={userId ? route.href : "/auth"}
              className={cn(
                " hover:text-gray-500 transition-all duration-150 ease-linear",
                isActive(route.href) && "text-gray-2 font-semibold"
              )}
            >
              {route.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <Link
            href="/cart"
            className="flex items-center gap-x-2 px-2 py-1 border border-gray-400 rounded-md hover:text-white hover:bg-black transition-all duration-300 ease-linear"
          >
            <ShoppingCart />
            <p>Cart ({cartItems.length})</p>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
