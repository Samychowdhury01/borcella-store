import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getHTML = ( name: string, otp:number) => {
  const htmlBody = `
  <p>Hello <strong>${name}</strong>,</p>
  <p>Your OTP for verification is:</p>

  <h2 style="color: #4CAF50; text-align: center;">${otp}</h2>

  <p>Please enter this OTP to verify your account. This code is valid for the next <strong>10 minutes</strong>.</p>

  <p>If you did not request this, please ignore this email.</p>

  <p>Best regards,<br/>The Admin Team</p>
`;
  return htmlBody;
};


export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}