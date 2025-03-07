import { Section } from "@/components/responsive-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="bg-primary/70 min-h-full lg:h-[70vh]">
      <Section>
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* title and buttons */}
          <div className="space-y-5 flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold lg:leading-[3.5rem] lg:tracking-wide">
              Borcella – Elevate Your Lifestyle with Curated Essentials
            </h1>
            <p className="text-justify">
              Borcella is your go-to online destination for premium, handpicked
              products that blend style, quality, and functionality. From
              fashion and beauty to home essentials, we offer a thoughtfully
              curated selection designed to enhance your everyday life. Discover
              unique finds, timeless pieces, and the latest trends – all in one
              place. Experience shopping redefined with Borcella.
            </p>
            <div className="flex items-center gap-3">
              <Button variant={"secondary"} asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button variant={"ghost"} asChild>
                <Link href="/auth">Login</Link>
              </Button>
            </div>
          </div>
          {/* image */}
          <div className="flex-1 relative aspect-square mt-10 md:-mt-5 w-full">
            <Image
              src="/banner-image.png"
              alt="banner-image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Banner;