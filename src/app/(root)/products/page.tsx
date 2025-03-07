import { Section } from "@/components/responsive-section";
import SectionTitle from "../_components/section-title";
import { getProducts } from "@/actions/product-actions";
import ProductCard from "@/components/product-card";
import { TProduct } from "@/types/product-type";
import SearchBox from "@/components/ui/search-box";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <Section>
      <SectionTitle title="All Products" width="20px" />
      <div className="space-y-5 mt-10">
      {products.length !== 0 && <SearchBox />}
      </div>
      {products.length === 0 && (
        <p className="text-center w-full text-red-500 font-bold">
          No Products Found!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto mt-10">
        {products.length !== 0 &&
          products.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Section>
  );
};

export default ProductsPage;
