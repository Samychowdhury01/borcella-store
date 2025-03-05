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
    label: "Wishlist",
    href: "/wishlist",
  },
  {
    label: "orders",
    href: "/orders",
  },
];

const NavbarRoutes = () => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className={"flex items-center gap-4"}>
      {routes.map((route, index) => (
        <Link
          key={index}
          href={(route.href === "/" && "/") || userId ? route.href : "/auth"}
          className={cn(
            "hover:text-gray-500 transition-all duration-150 ease-linear",
            isActive(route.href) && "text-gray-2 font-semibold"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default NavbarRoutes;
