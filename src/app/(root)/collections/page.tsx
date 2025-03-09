import { Section } from "@/components/responsive-section";
import SectionTitle from "../_components/section-title";
import { getCollections } from "@/actions/collection-action";
import { CollectionCard } from "./_components/collection-card";
import { TCollection } from "@/types/collection-type";
import SectionHeading from "../_components/section-heading";
import SectionBanner from "../_components/section-banner";

const CollectionsPage = async () => {
  const collections = await getCollections();

  return (
    <>
      <SectionBanner title="All Collections" />
      <Section className="responsive-section-bottom">
        {collections?.length === 0 && (
          <p className="text-center w-full text-red-500 font-bold">
            No collections Found!
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto mt-10">
          {collections?.length !== 0 &&
            collections.map((collection: TCollection) => (
              <CollectionCard
                href={`/collections/${collection.id}`}
                imageUrl={collection.imageUrl}
                title={collection.title}
                productCount={collection.productIds.length}
                id={collection.id}
                key={collection.id}
              />
            ))}
        </div>
      </Section>
    </>
  );
};

export default CollectionsPage;
