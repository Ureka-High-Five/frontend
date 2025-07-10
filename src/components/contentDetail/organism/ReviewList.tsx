import ReviewItem from "@/components/contentDetail/molecules/ReviewItem";
import type { Review } from "@/types/content";

type ReviewListProps = Pick<
  Review,
  "reviewId" | "userProfileUrl" | "userRating" | "userReview"
>[];

const ReviewList = ({ reviews }: { reviews: ReviewListProps }) => {
  return (
    <section className="flex flex-col">
      <h2 className="body-lg-dohyeon text-custom-gray pb-4">리뷰</h2>
      {reviews.map((review) => (
        <ReviewItem
          key={review.reviewId}
          userProfileUrl={review.userProfileUrl}
          userRating={review.userRating}
          userReview={review.userReview}
        />
      ))}
    </section>
  );
};

export default ReviewList;
