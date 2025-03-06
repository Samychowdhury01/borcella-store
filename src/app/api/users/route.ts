import { auth } from "@/auth";
import { sendMail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { generateOTP, getHTML } from "@/lib/utils";
import bcrypt from "bcryptjs";
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

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );
    const otp = generateOTP();
    const html = getHTML(email, otp);

    const newData = {
      email,
      name,
      password: hashedPassword,
      otp,
    };

    const newSignUpUser = await prisma.signUp.create({
      data: newData,
    });

    if (!newSignUpUser.id) {
      return NextResponse.json({
        statusCode: 400,
        success: true,
        message: "User creation failed",
        data: [],
      });
    }
    // Send email notification
    await sendMail(newSignUpUser.email, "Verify User Email", html);

    return NextResponse.json({
      statusCode: 201,
      success: true,
      message: "Sign up successful!",
      data: newSignUpUser,
    });
  } catch (error) {
    console.log("[ERROR: at user POST method]", error);
    return NextResponse.json({
      statusCode: 500,
      success: false,
      message: "Internal server error",
      data: [],
    });
  }
}
