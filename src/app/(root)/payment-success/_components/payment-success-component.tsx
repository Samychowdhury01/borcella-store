"use client";

import { useState, useEffect } from "react";
import { Check, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./_style/index.css";
import useCart from "@/hook/use-cart";
import Link from "next/link";
import { Section } from "@/components/responsive-section";

const PaymentSuccessComponent = () => {
    const cart = useCart();
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // clear cart
    cart.clearCart();
    // Trigger check animation after a short delay
    const checkTimer = setTimeout(() => setShowCheck(true), 300);

    // Show content with a slight delay after the check
    const contentTimer = setTimeout(() => setShowContent(true), 800);

    return () => {
      clearTimeout(checkTimer);
      clearTimeout(contentTimer);
    };
  }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
        <Section className="text-center space-y-6">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 transition-all duration-500 ease-out ${
              showCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <Check
              className={`w-16 h-16 transition-all duration-500 ease-out ${
                showCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
              strokeWidth={3}
            />
          </div>
  
          <div
            className={`space-y-4 transition-all duration-500 ease-out ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600">Thank you for your purchase.</p>
          </div>
  
          <Button
            className={`mt-8 transition-all duration-500 ease-out ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            asChild
          >
            <Link href={"/"}>
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </Section>
      </div>
    );
};

export default PaymentSuccessComponent;