"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ProductPhotoGallery = ({ media }: { media: string[] }) => {
  const [imageUrl, setImageUrl] = useState(media[0]);
  return (
    <div className="flex flex-col gap-5 max-w-[500px]">
      <Image
        src={imageUrl}
        alt="product-image"
        width={800}
        height={800}
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-3 overflow-auto tailwind-scrollbar-hide">
        {media?.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="product-image"
            height={200}
            width={200}
            className={cn(
              "w-20 h-20 rounded-lg object-cover cursor-pointer",
              imageUrl === img && "border-2 border-primary"
            )}
            onClick={() => setImageUrl(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPhotoGallery;
