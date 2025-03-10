import { Section } from "@/components/responsive-section";
import { getProducts } from "@/actions/product-actions";
import ProductCard from "@/components/product-card";
import { TProduct } from "@/types/product-type";
import SearchBox from "@/components/ui/search-box";
import SectionBanner from "../_components/section-banner";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Browse Products",
    description: "Here you will find the products listed on the website",
  };
};

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <>
      <SectionBanner title="All Products" />
      <Section className="responsive-section-bottom">
        {products.length === 0 && (
          <p className="text-center w-full text-red-500 font-bold">
            No Products Found!
          </p>
        )}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-5 mt-10 md:w-[33%] shadow-xl p-7 h-fit md:sticky top-5">
            <div>
              <h2 className="text-[25px] font-bold relative title">Search</h2>
              <div className="w-[30px] h-[3px] bg-primary"></div>
            </div>
            {products.length !== 0 && <SearchBox />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto mt-10">
            {products.length !== 0 &&
              products.map((product: TProduct) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default ProductsPage;
