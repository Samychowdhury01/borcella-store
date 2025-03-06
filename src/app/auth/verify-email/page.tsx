import React from "react";
import { InputOTPForm } from "./_components/otp-input";
import { VerificationClient } from "./_components/verification-page";

const VerifyUserPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) => {
  
  const {token}=  await searchParams
  
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
    <VerificationClient token={token} />
  </div>
  );
};

export default VerifyUserPage;
