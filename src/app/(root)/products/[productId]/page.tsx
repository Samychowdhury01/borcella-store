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
import SectionHeading from "../../_components/section-heading";
import SectionBanner from "../../_components/section-banner";
import ProductTab from "./_components/product-tab";
import { Metadata } from "next";
import { capitalizeTitle } from "@/lib/capitalize-title";
interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: ProductDetailsPageProps): Promise<Metadata> => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  const title = productDetails?.title && capitalizeTitle(productDetails?.title);
  return {
    title,
    description: productDetails.description,
  };
};

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);

  return (
    <>
      <SectionBanner
        title={productDetails.title}
        categoryType={productDetails.category}
      />
      <Section>
        <div className="flex justify-start items-center gap-16 max-md:flex-col max-md:items-center">
          <ProductPhotoGallery media={productDetails?.media} />

          <div className="flex-1 w-full">
            <ProductInfo productInfo={productDetails} />
          </div>
        </div>
        {/* tab */}
        <div className="mt-10">
          <ProductTab productId={productId} />
        </div>
        {relatedProducts.length !== 0 && (
          <div className="flex flex-col py-5 mt-20">
            <SectionHeading
              title="Related Products"
              description="Here are some related products that you may like."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-5 mt-5">
              {relatedProducts?.map((product: TProduct) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
};

export default ProductDetailsPage;
