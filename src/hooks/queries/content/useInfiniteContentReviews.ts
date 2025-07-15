import { useInfiniteQuery } from "@tanstack/react-query";
import { getContentReviews } from "@/apis/content/getContentReview";
import type { ReviewListResponse } from "@/types/content";

export const useInfiniteContentReviews = (
  contentId: string,
  size: number = 5
) => {
  return useInfiniteQuery<ReviewListResponse>({
    queryKey: ["contentReviews", contentId],
    queryFn: (context) =>
      getContentReviews(contentId, context.pageParam as string, size),
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? "") : "",
    enabled: !!contentId,
  });
};
