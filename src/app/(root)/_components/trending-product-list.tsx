import {  getProductsByCollectionId } from "@/actions/product-actions";
import ProductCard from "@/components/product-card";
import { Section } from "@/components/responsive-section";
import { TProduct } from "@/types/product-type";
import React from "react";
import SectionTitle from "./section-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./section-heading";

const TrendingProductList = async () => {
  const products = await getProductsByCollectionId("67c2a5dd186167c89b831a76");
  
  return (
    <Section>
      <SectionHeading
      title="Trending Products"
      description="Here is our trending products that you may like."
      />
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
