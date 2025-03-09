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
import { getProductFAQs } from "@/actions/faq-action";
import ProductTab from "./_components/product-tab";
interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}
const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);
  const faqs = await getProductFAQs(productId);
  console.log(faqs)
  return (
    <>
      <SectionBanner title={productDetails.title} />
      <Section>
        <div className="flex justify-center items-center gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
          <ProductPhotoGallery media={productDetails?.media} />

          <ProductInfo productInfo={productDetails} />
        </div>
        {/* tab */}
        <div>
          <ProductTab productId={productId}/>
        </div>
        {relatedProducts.length !== 0 && (
          <div className="flex flex-col items-center px-10 py-5 max-md:px-3 mt-20">
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
