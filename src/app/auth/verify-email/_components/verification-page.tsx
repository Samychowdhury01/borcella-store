"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/actions/user-action";
import toast from "react-hot-toast";

type VerificationStatus = "loading" | "success" | "error";

export function VerificationClient({ token }: { token: string }) {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await verifyUser(token);
        if (result.status) {
          setStatus("success");
          setMessage(
            result.message || "Your account has been verified successfully!"
          );
          toast.success(result.message);

          // Redirect to auth page after a short delay
          setTimeout(() => {
            router.push("/auth");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(
            result.message || "Verification failed. Please try again."
          );
          // Show error toast
          toast.error(result.message);
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");

        // Show error toast
      }
    };

    verify();
  }, [token, toast, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      {status === "loading" && (
        <>
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <h2 className="text-xl font-semibold">Verifying your account...</h2>
          <p className="text-muted-foreground">
            Please wait while we verify your account.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="w-12 h-12 text-green-500" />
          <h2 className="text-xl font-semibold">Verification Successful!</h2>
          <p className="text-muted-foreground">{message}</p>
          <p className="text-sm text-muted-foreground">
            Redirecting to login page...
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-semibold">Verification Failed</h2>
          <p className="text-muted-foreground">{message}</p>
        </>
      )}
    </div>
  );
}
