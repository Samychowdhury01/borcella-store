"use server";

import { sendMail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { generateOTP, getHTML } from "@/lib/utils";
import bcrypt from "bcryptjs";

interface Payload {
  email: string;
  password: string;
  name: string;
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

export const verifyUser = async (email: string, otp: number) => {
  // first check if user exist or not
  const isUserExist = await prisma.signUp.findUnique({
    where: {
      email,
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
  const isOTPMatched = Number(otp) === Number(isUserExist.otp);
  // check if otp matched or not
  if (isUserExist && !isOTPMatched) {
    return {
      status: false,
      message: "Wrong OTP! Try Again",
    };
  }
  await prisma.signUp.update({
    where: {
      email,
    },
    data: {
      status: "active",
      otp: null,
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
