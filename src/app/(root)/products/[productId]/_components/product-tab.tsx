import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewSection } from "./review-section";
import { FaqSection } from "./faq-section";

export default function ProductTab({ productId }: { productId: string }) {
  return (
    <div className="w-full py-6">
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="pt-4">
          <ReviewSection productId={productId} />
        </TabsContent>
        <TabsContent value="faqs" className="pt-4">
          <FaqSection productId={productId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
