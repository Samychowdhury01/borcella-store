import { getProducts } from "@/actions/product-actions";
import ProductCard from "@/components/product-card";
import { TProduct } from "@/types/product-type";
import React from "react";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <section className="flex flex-col items-center gap-10 py-8 px-5">
      <h2 className="text-heading1 leading-heading1 font-bold mb-5 text-center">
        Products
      </h2>
      {products.length === 0 && (
        <p className="text-center w-full text-red-500 font-bold">
          No Products Found!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto">
        {products.length !== 0 &&
          products.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
