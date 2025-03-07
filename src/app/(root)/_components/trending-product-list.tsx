import {  getProductsByCollectionId } from "@/actions/product-actions";
import ProductCard from "@/components/product-card";
import { Section } from "@/components/responsive-section";
import { TProduct } from "@/types/product-type";
import React from "react";
import SectionTitle from "./section-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TrendingProductList = async () => {
  const products = await getProductsByCollectionId("67c2a5dd186167c89b831a76");
  
  return (
    <Section>
      <div className="flex items-center justify-between mb-10 mt-16">
        {/* heading */}
        
        <div className="flex flex-col items-start">
      <h2 className="text-heading3 md:text-heading1 md:leading-heading1  font-bold line-clamp-1 ">
      Trending Products 🔥
      </h2>
      <div
        className={`h-2 bg-primary w-[30px]`}
       
      ></div>
    </div>
        <Button asChild className="group">
          <Link href="/collections/67c2a5dd186167c89b831a76" className="flex items-center gap-x-1">
            See Trending Products
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      {products.length === 0 && (
        <p className="text-center w-full text-red-500 font-bold">
          No Products Found!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto">
        {products.length !== 0 &&
          products
            ?.slice(0, 8)
            .map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </Section>
  );
};

export default TrendingProductList;
