import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHTML = (name: string, url: string) => {
  const htmlBody = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">

  <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
    <p>Hello <strong style="color: #007BFF;">${name}</strong>,</p>
    
    <p>Your Link for verification is:</p>

    <a href="${url}" 
       style="color: #fff; background-color: #007BFF; text-decoration: none; 
              padding: 10px 20px; border-radius: 8px; 
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: inline-block;">
      Click here to visit verify
    </a>

    <p>Please enter this OTP to verify your account. This code is valid for the next <strong>10 minutes</strong>.</p>

    <p>If you did not request this, please ignore this email.</p>

    <p>Best regards,<br/>The Admin Team</p>
  </div>

</body>
</html>

`;
  return htmlBody;
};

