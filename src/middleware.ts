  import { auth } from "@/auth";
  import { NextResponse } from "next/server";
  import type { NextRequest } from "next/server";

  const protectedRoutes = ["/wishlist", "/orders", "/cart"];

  export default async function middleware(request: NextRequest) {
    const session = await auth();
    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected && !session) {
      return NextResponse.redirect(new URL("auth", request.url));
    }

    return NextResponse.next();
  }
