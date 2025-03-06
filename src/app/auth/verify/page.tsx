import React from "react";
import { InputOTPForm } from "./_components/otp-input";

const VerifyUserPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) => {
  
  const {email}=  await searchParams
  return (
    <div>
      <InputOTPForm email={email} />
    </div>
  );
};

export default VerifyUserPage;
