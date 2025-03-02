import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    const { productId } = await req.json()

    if (!userId) {
      return NextResponse.json({
        statusCode: 401,
        success: false,
        message: "Unauthorized",
        data: [],
      })
    }

    if (!productId) {
      return NextResponse.json({
        statusCode: 400,
        success: false,
        message: "Product Id is required",
        data: [],
      })
    }

    // Find the user first to check if the product is already in the wishlist
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        wishlist: true,
      },
    })

    if (!user) {
      return NextResponse.json({
        statusCode: 404,
        success: false,
        message: "User not found",
        data: [],
      })
    }

    const isLiked = user.wishlist?.includes(productId)

    // Update the user with a single database operation
    const updatedUser = await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        wishlist: isLiked
          ? { set: user.wishlist.filter((id) => id !== productId) } // Remove from wishlist
          : { push: productId }, // Add to wishlist
      },
      select: {
        wishlist: true,
      },
    })

    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: isLiked ? "Product removed from wishlist" : "Product added to wishlist",
      data: updatedUser,
    })
  } catch (error) {
    console.log("[ERROR at wishlist]:", error)
    return NextResponse.json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      data: [],
    })
  }
}


