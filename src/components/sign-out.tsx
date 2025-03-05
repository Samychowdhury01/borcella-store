"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <Button onClick={() => signOut({redirectTo: '/'})} className="cursor-pointer flex items-center gap-x-1">
        <LogOut/>
      <p>Sign Out</p>
    </Button>
  );
}
