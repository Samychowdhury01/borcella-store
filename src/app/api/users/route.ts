import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({
        statusCode: 401,
        success: false,
        message: "Unauthorized access",
        data: [],
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    let newUser;
    if (!user) {
      newUser = await prisma.user.create({
        data: {
          clerkId: userId,
        },
      });
    }
    return NextResponse.json({
      statusCode: 201,
      success: true,
      message: "new user created into the database",
      data: newUser,
    });
  } catch (error) {
    console.log("[ERROR: at user GET method]", error);
    return NextResponse.json({
      statusCode: 500,
      success: false,
      message: "Internal server error",
      data: [],
    });
  }
}
