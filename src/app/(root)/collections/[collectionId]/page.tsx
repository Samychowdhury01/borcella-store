import { getSingleCollection } from "@/actions/collection-action";
import ProductCard from "@/components/product-card";
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
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails.imageUrl}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3 font-bold text-gray-2">
        {collectionDetails.title}
      </p>
      <p className="text-body font-normal text-gray-2 text-center max-w-[900px]">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-16 justify-center">
        {collectionDetails.products.length !== 0 &&
          collectionDetails.products.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CollectionDetails;
