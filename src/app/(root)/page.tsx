import Image from "next/image";
import React from "react";
import Collections from "./_components/collections";
import ProductList from "./_components/product-list";
import PhotoGallery from "./_components/photo-gallery";
import TrendingProductList from "./_components/trending-product-list";
import Banner from "./_components/banner";

const HomePage = () => {
  return (
    <div>
      {/* <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
        <div className="relative w-full max-w-7xl aspect-[21/9] rounded-lg overflow-hidden">
          <Image
            src="/banner.png"
            alt="Banner image"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div> */}
      <Banner/>
      <Collections />
      <ProductList />
      <TrendingProductList />
      <PhotoGallery />
    </div>
  );
};

export default HomePage;
