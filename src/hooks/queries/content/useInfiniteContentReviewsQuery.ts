import { useInfiniteQuery } from "@tanstack/react-query";
import { getContentReviews } from "@/apis/content/getContentReview";
import type { ReviewListResponse, Review } from "@/types/content";

export const useInfiniteContentReviewsQuery = (
  contentId: string,
  size: number = 5
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ReviewListResponse>({
      queryKey: ["contentReviews", contentId],
      queryFn: ({ pageParam = "" }) =>
        getContentReviews(contentId, pageParam as string, size),
      initialPageParam: "",
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? "") : undefined,
      enabled: !!contentId,
    });

  const reviews: Review[] =
    data?.pages.flatMap((page) => page.items ?? []) ?? [];

  return {
    reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
