import { getSearchResults } from "@/actions/search-action";
import ProductCard from "@/components/product-card";
import { Section } from "@/components/responsive-section";
import { TProduct } from "@/types/product-type";
import React from "react";
import SectionBanner from "../../_components/section-banner";
import { Metadata } from "next";

type Props = {
  params: Promise<{ query: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { query } = await params;
  return {
    title: `Search result for ${query}`,
    description: "Here you will find the products with the search query",
  };
};

const SearchPage = async ({ params }: Props) => {
  const { query } = await params;
  const searchResults = await getSearchResults(query);
  const decodedQuery = decodeURIComponent(query);
  return (
    <>
      <SectionBanner title="Search Results" />
      <Section className="responsive-section-bottom">
        <p className="text-heading3 font-bold my-10 text-center">
          Search result for {decodedQuery}
        </p>

        {!searchResults.length && (
          <p className="font-semibold text-destructive text-center">
            No products found with {decodedQuery}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-5">
          {searchResults.length !== 0 &&
            searchResults?.map((product: TProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Section>
    </>
  );
};

export default SearchPage;
