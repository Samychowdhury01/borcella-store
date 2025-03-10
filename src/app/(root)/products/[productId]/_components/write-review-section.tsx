"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Loader, Send, StarIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { createReview } from "@/actions/review-action";
import toast from "react-hot-toast";
import "../_style/index.css";
// Define the form schema with zod
const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  content: z.string().min(5, "Review must be at least 5 characters"),
});
type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export default function WriteReviewSection({
  productId,
}: {
  productId: string;
}) {
  const [loading, startTransition] = useTransition();
  const session = useSession();
  const name = session?.data?.user?.name;
  const [hoveredRating, setHoveredRating] = useState(0);

  // Initialize the form
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  // Handle form submission
  function handleSubmit(data: ReviewFormValues) {
    startTransition(async () => {
      // Create new review object
      const newReview = {
        name: name as string,
        productId,
        rating: data.rating,
        content: data.content,
      };

      const result = await createReview(newReview);

      if (result.success) {
        toast.success(result.message);
        form.reset({
          rating: 0,
          content: "",
        });
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle className="text-lg">Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <StarIcon
                            className={`h-6 w-6 ${
                              star <= (hoveredRating || field.value)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm self-center">
                        {field.value > 0
                          ? `${field.value} star${field.value > 1 ? "s" : ""}`
                          : "Select rating"}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with this product..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!session || loading}>
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <p className="flex items-center gap-x-2">
                  Submit review
                  <Send />
                </p>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
