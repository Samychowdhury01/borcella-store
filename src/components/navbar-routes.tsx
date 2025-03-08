"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Wishlist",
    href: "/wishlist",
  },
  {
    label: "orders",
    href: "/orders",
  },
];

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className={"flex items-center gap-4"}>
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            "hover:font-bold transition-all duration-150 ease-linear uppercase",
            isActive(route.href) && "font-bold"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default NavbarRoutes;
