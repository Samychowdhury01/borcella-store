import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import WriteReviewSection from "./write-review-section";
import { getProductReviews } from "@/actions/review-action";

export async function ReviewSection({ productId }: { productId: string }) {
  const reviews = await getProductReviews(productId);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0";
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1).toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-2">
            Average Rating:
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-4 w-4 ${
                  star <=
                  Math.round(Number.parseFloat(calculateAverageRating()))
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium">
            {calculateAverageRating()}/5
          </span>
        </div>
      </div>

      <WriteReviewSection productId={productId} />

      {reviews.length === 0 && <p className="text-center text-primary">No Review Available!</p>}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{review.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {Intl.DateTimeFormat("US").format(review?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
