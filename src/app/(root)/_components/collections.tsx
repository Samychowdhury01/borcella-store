import { getCollections } from "@/actions/collection-action";
import { TCollection } from "@/types/collection-type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollections();
  return (
    <section className="flex flex-col items-center gap-10 py-8 px-5">
      {/* heading */}
      <h2 className="text-heading1 leading-heading1 font-bold mb-5 text-center">
        Collections
      </h2>
      {collections.length === 0 && (
        <p className="text-center w-full text-red-500 font-bold">
          No Collections Found!
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {collections.length !== 0 &&
          collections?.map((collection: TCollection) => (
            <Link
              href={`/collections/${collection.id}`}
              key={collection.id}
              className="flex-1"
            >
              <Image
                src={collection.imageUrl}
                alt={collection.title}
                width={350}
                height={200}
                className="rounded-lg cursor-pointer"
              />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Collections;
