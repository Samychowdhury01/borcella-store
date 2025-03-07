import { getCollections } from "@/actions/collection-action";
import { Section } from "@/components/responsive-section";
import { TCollection } from "@/types/collection-type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SectionTitle from "./section-title";
import { CollectionCard } from "../collections/_components/collection-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Collections = async () => {
  const collections = await getCollections();
  return (
    <Section>
      <>
        <div className="flex items-center justify-between mb-10 mt-16">
          {/* heading */}
          <SectionTitle title="Collections" width="30px" />

          <Button asChild className="group">
            <Link href="/collections" className="flex items-center gap-x-1">
              See All Collections
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        {collections.length === 0 && (
          <p className="text-center w-full text-red-500 font-bold">
            No Collections Found!
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-5">
          {collections.length !== 0 &&
            collections
              ?.slice(0, 4)
              .map((collection: TCollection) => (
                <CollectionCard
                  key={collection.id}
                  id={collection.id}
                  title={collection.title}
                  imageUrl={collection.imageUrl}
                  productCount={collection.productIds.length}
                />
              ))}
        </div>
      </>
    </Section>
  );
};

export default Collections;
