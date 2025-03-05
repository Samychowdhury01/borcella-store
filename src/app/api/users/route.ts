import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId || !session) {
      return NextResponse.json({
        statusCode: 401,
        success: false,
        message: "Unauthorized access",
        data: [],
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    let newUser;
    if (!user) {
      newUser = await prisma.user.create({
        data: {
          userId,
        },
      });
    }
    return NextResponse.json({
      statusCode: 201,
      success: true,
      message: "new user created into the database",
      data: user ? user : newUser,
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
