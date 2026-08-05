import { useEffect } from "react";
import { getContentDetail } from "@lead-me/api/getContentDetail";
import { useQueryClient } from "@tanstack/react-query";
import { getContentReviews } from "@/apis/content/getContentReview";
import { getMyReview } from "@/apis/content/getMyReview";
import { useLazyIntersectionObserver } from "@/hooks/common/useLazyIntersectionObserver";
import type { ReviewListResponse } from "@lead-me/types/content";

export const usePrefetchContentOnView = (contentId: string) => {
  const queryClient = useQueryClient();

  const { ref, isIntersecting } = useLazyIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting) return;

    queryClient.prefetchQuery({
      queryKey: ["contentDetail", contentId],
      queryFn: () => getContentDetail(contentId),
      staleTime: 10 * 60 * 1000,
    });

    queryClient.prefetchInfiniteQuery({
      queryKey: ["contentReviews", contentId],
      queryFn: ({ pageParam = "" }) =>
        getContentReviews(contentId, pageParam, 5),
      initialPageParam: "",
      getNextPageParam: (lastPage: ReviewListResponse) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? "") : undefined,
      staleTime: 10 * 60 * 1000,
    });

    queryClient.prefetchQuery({
      queryKey: ["myReview", contentId],
      queryFn: () => getMyReview(contentId),
      staleTime: 10 * 60 * 1000,
    });
  }, [contentId, isIntersecting, queryClient]);

  return { ref };
};
