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
    <section
      aria-labelledby="review-tab-title"
      className="flex flex-col h-full items-center pt-8">
      <h2 id="review-tab-title" className="sr-only">
        내가 작성한 리뷰
      </h2>
      <div
        ref={rootRef}
        className="w-full flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {reviews.length === 0 ? (
          <section
            aria-label="작성된 리뷰 없음"
            className="flex flex-1 flex-col items-center justify-center text-custom-gray">
            <h3 className="heading-h2-pretendard">아직 작성한 리뷰가 없어요</h3>
            <p className="body-lg-pretendard mt-2">
              마음에 들었던 콘텐츠를 리뷰로 남겨보세요!
            </p>
          </section>
        ) : (
          <ul className="flex flex-col gap-6">
            {reviews.map((review) => (
              <MyReviewItem
                key={review.id}
                reviewId={review.id}
                thumbnailUrl={review.thumbnailUrl}
                title={review.title}
                review={review.review}
                rating={review.rating}
                contentId={review.contentId}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </ul>
        )}

        <div ref={targetRef} className="h-6" />
        {isFetchingNextPage && (
          <div
            role="status"
            className="flex items-center w-full justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-custom-point mb-4" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewTab;
