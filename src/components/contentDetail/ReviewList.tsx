import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        <article
          key={review.reviewId}
          className="flex items-center text-white pb-3 gap-3">
          <Avatar>
            <AvatarImage src={review.userProfileUrl} alt="프로필" />
            <AvatarFallback>cn</AvatarFallback>
          </Avatar>
          <div className="flex flex-col body-sm-pretendard">
            <div className="text-custom-gray">{review.userRating}/5</div>
            <div className="text-white">{review.userReview}</div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ReviewList;
