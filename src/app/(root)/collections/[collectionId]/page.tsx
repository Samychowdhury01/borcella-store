import { getSingleCollection } from "@/actions/collection-action";
import ProductCard from "@/components/product-card";
import { Section } from "@/components/responsive-section";
import { TProduct } from "@/types/product-type";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) => {
  const { collectionId } = await params;
  const collectionDetails = await getSingleCollection(collectionId);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Image
          src={collectionDetails.imageUrl}
          width={1500}
          height={1000}
          alt="collection"
          className="w-full h-[400px] object-cover"
        />
      </div>
      <Section className="responsive-section-bottom">
        <div className="flex flex-col items-center gap-5">
          <div>
            <p className="text-heading2 font-bold font-lora">
              {collectionDetails.title}
            </p>
            <div className="h-[3px] bg-primary"></div>
          </div>
          <p className="text-body font-normal text-gray-2 text-center max-w-[900px]">
            {collectionDetails.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center mt-16">
          {collectionDetails.products.length !== 0 &&
            collectionDetails.products.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Section>
    </>
  );
};

export default CollectionDetails;
