"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { routes } from "./navbar-routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DropdownMenubar() {
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
              href={route.href}
              className={cn(
                " hover:text-gray-500 transition-all duration-150 ease-linear",
                isActive(route.href) && "text-primary font-semibold"
              )}
            >
              {route.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
