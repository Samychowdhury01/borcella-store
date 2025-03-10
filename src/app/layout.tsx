import type { Metadata } from "next";
import { Mulish, Lora } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import Providers from "@/lib/providers";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Borcella',
    default: 'Borcella', 
  },
  description: "A Place For Stylish | Borcella",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body
          className={`${mulish.variable} ${lora.variable} antialiased`}
        >
          <Providers>
            <Navbar />
            {children}
            <Footer />
            <Toaster position="top-center" />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}