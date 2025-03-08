import { getSearchResults } from "@/actions/search-action";
import ProductCard from "@/components/product-card";
import { Section } from "@/components/responsive-section";
import { TProduct } from "@/types/product-type";
import React from "react";
const SearchPage = async ({
  params,
}: {
  params: Promise<{ query: string }>;
}) => {
  const { query } = await params;
  const searchResults = await getSearchResults(query);
  const decodedQuery = decodeURIComponent(query);
  return (
    <Section  className="!pt-0">
      <p className="text-heading3 font-bold my-10">
        Search result for {decodedQuery}
      </p>

      {!searchResults.length && (
        <p className="font-semibold text-destructive">
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
  );
};

export default SearchPage;
