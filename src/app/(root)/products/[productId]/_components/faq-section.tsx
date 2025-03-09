import { getProductFAQs } from "@/actions/faq-action";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function FaqSection({ productId }: { productId: string }) {
  const defaults = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination and customs processing.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be in their original condition with all packaging.",
    },
    {
      question: "Is there a warranty included?",
      answer:
        "Yes, all our products come with a standard 1-year manufacturer's warranty that covers defects in materials and workmanship. Extended warranty options are available at checkout.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates are calculated at checkout based on destination, weight, and selected shipping method.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account on our website to view real-time updates on your order status.",
    },
  ];
  const fetchedFaqs = await getProductFAQs(productId);

  const faqs = fetchedFaqs?.faqs?.length ? fetchedFaqs.faqs : defaults;
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Frequently Asked Questions</h3>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq: any, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
