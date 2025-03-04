import Image from "next/image";
import React from "react";
import Collections from "./_components/collections";
import ProductList from "./_components/product-list";

const HomePage = () => {
  
  return (
    <div>
      {/* banner Image */}
      <div className="w-full h-[100vh] relative">
      <Image alt="banner-image-of-borcella-store" fill src="/banner.png" className="w-full" />
      </div>
      <Collections/>
      <ProductList/>
    </div>
  );
};

export default HomePage;
