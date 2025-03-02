import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function DropdownMenubar() {
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
        <DropdownMenuItem>Wishlist</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
