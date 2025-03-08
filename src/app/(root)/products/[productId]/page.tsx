import {
  getProductDetails,
  getRelatedProducts,
} from "@/actions/product-actions";
import React from "react";
import ProductPhotoGallery from "./_components/product-photo-gallery";
import ProductInfo from "./_components/product-info";
import { TProduct } from "@/types/product-type";
import ProductCard from "@/components/product-card";
import { Section } from "@/components/responsive-section";
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
    <Section>
      <div className="flex justify-start items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <ProductPhotoGallery media={productDetails?.media} />

        <ProductInfo productInfo={productDetails} />
      </div>
      {relatedProducts.length !== 0 && (
        <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
          <p className="text-heading3 font-bold">Related Products</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-5 mt-5">
            {relatedProducts?.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
};

export default ProductDetailsPage;
