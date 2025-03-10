"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ProductPhotoGallery = ({ media }: { media: string[] }) => {
  const [imageUrl, setImageUrl] = useState(media[0]);
  return (
    <div className="flex flex-col gap-4 max-w-[500px]"> {/* Reduced gap */}
      {/* Main image - now full width + centered */}
      <div className="w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="product-image"
          width={800}
          height={800}
          className="w-full h-96 object-cover shadow-xl rounded-lg mx-auto"
        />
      </div>

      {/* Thumbnails container - improved spacing */}
      <div className="flex gap-4 overflow-auto tailwind-scrollbar-hide px-1 pb-2">
        {media?.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="product-image"
            height={200}
            width={200}
            className={cn(
              "w-24 h-24 rounded-lg object-cover cursor-pointer flex-shrink-0", // Increased size + prevent shrink
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