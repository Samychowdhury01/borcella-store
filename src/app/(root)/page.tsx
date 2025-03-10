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
      <Banner/>
      <Collections />
      <ProductList />
      <TrendingProductList />
      <PhotoGallery />
    </div>
  );
};

export default HomePage;
