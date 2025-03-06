"use server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload {
  email: string;
  password: string;
  name: string;
}

interface DecodedToken extends JwtPayload {
  email: string;
  password: string;
}

export const createUser = async (payload: Payload) => {
  const res = await fetch(`${process.env.BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!result.success) {
    return null;
  }
  return result.data;
};

export const verifyUser = async (token: string) => {
  const decoded: any = jwt.verify(token, process.env.AUTH_SECRET as string);

  const { email, password } = decoded;
  // first check if user exist or not
  const isUserExist = await prisma.signUp.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!isUserExist) {
    return {
      status: false,
      message: "No user found with this mail",
    };
  }

  // check if user active and already verified
  if (isUserExist && isUserExist.status === "active") {
    return {
      status: false,
      message: "You are already verified",
    };
  }

  const isTokenMatched = token === isUserExist.token;
  // check if otp matched or not
  if (isUserExist && !isTokenMatched) {
    return {
      status: false,
      message: "Verification failed!",
    };
  }

    await prisma.signUp.update({
      where: {
        email,
      },
      data: {
        status: "active",
      },
    });

  return {
    status: true,
    message: "Verification successful!",
  };
};

export const getUser = async (email: string) => {
  const user = await prisma.signUp.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return null;
  }
  return user;
};
