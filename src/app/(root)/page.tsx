import Image from "next/image";
import React from "react";
import Collections from "./_components/collections";
import ProductList from "./_components/product-list";
import PhotoGallery from "./_components/photo-gallery";

const HomePage = () => {
  
  return (
    <div>
      {/* banner Image */}
      <div className="w-full h-[100vh] relative">
      <Image
        alt="banner-image-of-borcella-store"
        src="/banner.png"
        fill
        sizes="100vw"
        priority
        className="w-full h-full object-cover"
      />
      </div>
      <Collections/>
      <ProductList/>
      <PhotoGallery/>
    </div>
  );
};

export default HomePage;
