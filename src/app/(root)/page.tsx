import Image from "next/image";
import React from "react";
import Collections from "./_components/collections";
import ProductList from "./_components/product-list";
import PhotoGallery from "./_components/photo-gallery";

const HomePage = () => {
  return (
    <div>
      {/* banner Image */}
      <div className="relative max-w-screen h-[40vh] md:h-[90vh] overflow-hidden">
        <Image
          src="/banner.png" // Image should be in the public folder
          alt="Responsive Banner"
          fill
          className="object-fill"
          priority
        />
      </div>
      <Collections />
      <ProductList />
      <PhotoGallery />
    </div>
  );
};

export default HomePage;
