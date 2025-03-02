import { getProductDetails } from "@/actions/product-actions";
import React from "react";
import ProductPhotoGallery from "./_components/product-photo-gallery";
import ProductInfo from "./_components/product-info";
interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}
const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  console.log(productDetails);
  return (
    <section className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <ProductPhotoGallery media={productDetails?.media} />

      <ProductInfo productInfo={productDetails} />
    </section>
  );
};

export default ProductDetailsPage;
