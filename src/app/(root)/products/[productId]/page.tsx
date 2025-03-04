import {
  getProductDetails,
  getRelatedProducts,
} from "@/actions/product-actions";
import React from "react";
import ProductPhotoGallery from "./_components/product-photo-gallery";
import ProductInfo from "./_components/product-info";
import { TProduct } from "@/types/product-type";
import ProductCard from "@/components/product-card";
interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}
const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);

  return (
    <section>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <ProductPhotoGallery media={productDetails?.media} />

        <ProductInfo productInfo={productDetails} />
      </div>
      {relatedProducts.length !== 0 && (
        <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
          <p className="text-heading3 font-bold">Related Products</p>
          <div className="flex flex-wrap gap-16 mx-auto mt-8">
            {relatedProducts?.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailsPage;
