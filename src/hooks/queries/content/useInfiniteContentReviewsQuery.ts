import { useInfiniteQuery } from "@tanstack/react-query";
import { getContentReviews } from "@/apis/content/getContentReview";
import type { ReviewListResponse } from "@/types/content";

export const useInfiniteContentReviewsQuery = (
  contentId: string,
  size: number = 5
) => {
  const {
    data: reviewPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ReviewListResponse>({
    queryKey: ["contentReviews", contentId],
    queryFn: ({ pageParam = "" }) =>
      getContentReviews(contentId, pageParam as string, size),
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? "") : undefined,
    enabled: !!contentId,
  });

  return {
    reviewPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
