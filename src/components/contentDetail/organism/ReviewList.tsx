import EmptyReviewMessage from "@/components/contentDetail/molecules/EmptyReviewMessage";
import ReviewItem from "@/components/contentDetail/molecules/ReviewItem";
import useUserInformationQuery from "@/hooks/queries/user/useUserInformationQuery";
import type { Review, MyReview } from "@/types/content";

interface ReviewListProps {
  reviews: Review[];
  myReview?: MyReview;
}

const ReviewList = ({ reviews, myReview }: ReviewListProps) => {
  const { userInformation } = useUserInformationQuery();

  const hasNoReviews = !myReview && reviews.length === 0;

  return (
    <section className="flex flex-col">
      <h2 className="body-lg-dohyeon text-custom-gray pb-4">리뷰</h2>
      {hasNoReviews ? (
        <EmptyReviewMessage />
      ) : (
        <>
          {myReview && (
            <ReviewItem
              key="my-review"
              userProfileUrl={userInformation?.profileUrl ?? ""}
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
        </>
      )}
    </section>
  );
};

export default ReviewList;
