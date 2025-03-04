import { getSearchResults } from "@/actions/search-action";
import ProductCard from "@/components/product-card";
import { TProduct } from "@/types/product-type";
import React from "react";
const SearchPage = async ({
  params,
}: {
  params: Promise<{ query: string }>;
}) => {
  const { query } = await params;
  const searchResults = await getSearchResults(query);
  const decodedQuery = decodeURIComponent(query)
  return (
    <section className="px-10 py-5 ">
      <p className="text-heading3 font-bold my-10">Search result for {decodedQuery}</p>

      {!searchResults.length && (
        <p className="font-semibold text-destructive">
          No products found with {decodedQuery}
        </p>
      )}
      <div className="flex flex-wrap justify-between gap-16">
        {searchResults.length !== 0 &&
          searchResults?.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default SearchPage;
