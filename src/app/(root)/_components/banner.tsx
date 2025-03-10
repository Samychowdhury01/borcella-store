import Image from "next/image";

import React from "react";

const Banner = () => {
  return (
    <div className="bg-muted min-h-full  relative">
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* title and buttons */}
          <div className="space-y-5 flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold lg:leading-[3.5rem] lg:tracking-wide font-lora">
              Borcella – Elevate Your Lifestyle with Curated Essentials
            </h1>
            <p className="text-justify text-accent-foreground">
              Borcella is your go-to online destination for premium, handpicked
              products that blend style, quality, and functionality. From
              fashion and beauty to home essentials, we offer a thoughtfully
              curated selection designed to enhance your everyday life. Discover
              unique finds, timeless pieces, and the latest trends – all in one
              place. Experience shopping redefined with Borcella.
            </p>
          </div>
          {/* image */}
          <div className="flex-1 relative aspect-square mt-10  w-full md:h-[600px]">
            <Image
              src="/banner-image.png"
              alt="banner-image"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
