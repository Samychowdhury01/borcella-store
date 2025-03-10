import { Metadata } from "next";
import PaymentSuccessComponent from "./_components/payment-success-component";

export const generateMetadata = (): Metadata => {
  return {
    title: "Payment confirmation",
    description: "Payment confirmation page.",
  };
};

export default function PaymentSuccessPage() {
  return <PaymentSuccessComponent />;
}
