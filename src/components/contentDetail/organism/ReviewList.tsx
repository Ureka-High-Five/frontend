import ReviewItem from "@/components/contentDetail/molecules/ReviewItem";
import type { Review, MyReview } from "@/types/content";

interface ReviewListProps {
  reviews: Review[];
  myReview?: MyReview;
}

const ReviewList = ({ reviews, myReview }: ReviewListProps) => {
  return (
    <section className="flex flex-col">
      <h2 className="body-lg-dohyeon text-custom-gray pb-4">리뷰</h2>
      {/* myReview가 있으면 가장 위에 표시 */}
      {myReview && (
        <ReviewItem
          key="my-review"
          userProfileUrl={""} // 필요시 myReview에 맞게 수정
          userRating={myReview.rating}
          userReview={myReview.review}
          isMyReview
        />
      )}
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
