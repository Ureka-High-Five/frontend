import { useInfiniteQuery } from "@tanstack/react-query";
import getUserReview from "@/apis/user/getUserReview";
import type { UserReviewListResponse, UserReview } from "@/types/user";

const useUserReviewInfiniteQuery = (size: number = 5) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<UserReviewListResponse>({
      queryKey: ["userReview"],
      queryFn: ({ pageParam = "" }) =>
        pageParam === ""
          ? getUserReview(undefined, size)
          : getUserReview(Number(pageParam), size),
      initialPageParam: "",
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? "") : undefined,
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    });

  const reviews: UserReview[] =
    data?.pages.flatMap((page) => page.items ?? []) ?? [];

  return {
    reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useUserReviewInfiniteQuery;
