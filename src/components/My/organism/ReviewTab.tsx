import { Loader2 } from "lucide-react";
import MyReviewItem from "@/components/My/molecule/MyReviewItem";
import { useIntersectionObserver } from "@/hooks/common/useIntersectionObserver";
import useDeleteReviewMutation from "@/hooks/queries/my/review/useDeleteReviewMutation";
import useUserReviewInfiniteQuery from "@/hooks/queries/my/review/useUserReviewInfiniteQuery";

const ReviewTab = () => {
  const { reviews, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserReviewInfiniteQuery();
  const { mutateDeleteMyReview } = useDeleteReviewMutation();

  const { rootRef, targetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    hasNextPage,
    delayMs: 300,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const handleDeleteClick = (reviewId: number) => {
    mutateDeleteMyReview(reviewId);
  };

  return (
    <div className="flex flex-col h-full items-center pt-8">
      <div ref={rootRef} className="w-full flex-1 overflow-y-auto no-scrollbar">
        <ul className="flex flex-col gap-6">
          {reviews.map((review) => (
            <MyReviewItem
              key={review.id}
              reviewId={review.id}
              thumbnailUrl={review.thumbnailUrl}
              title={review.title}
              review={review.review}
              rating={review.rating}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </ul>
        <div ref={targetRef} className="h-6" />
        {isFetchingNextPage && (
          <div className="flex items-center w-full justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewTab;
