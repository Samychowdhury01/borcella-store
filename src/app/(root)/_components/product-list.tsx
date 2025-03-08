import { getProducts } from "@/actions/product-actions";
import ProductCard from "@/components/product-card";
import { Section } from "@/components/responsive-section";
import { TProduct } from "@/types/product-type";
import React from "react";
import SectionTitle from "./section-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./section-heading";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <Section>
      <SectionHeading
        title="Popular Products"
        description="Here is our new arraival products that you may like."
      />
      {products.length === 0 && (
        <p className="text-center w-full text-red-500 font-bold">
          No Products Found!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-14 mx-auto">
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

export default ProductList;
