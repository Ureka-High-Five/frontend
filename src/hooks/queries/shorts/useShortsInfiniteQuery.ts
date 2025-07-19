import { useInfiniteQuery } from "@tanstack/react-query";
import { getShorts } from "@/apis/shorts/getShorts";
import type { GetShortsResponse } from "@/types/shorts";

export const useShortsInfiniteQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<GetShortsResponse>({
      queryKey: ["shorts"],
      queryFn: ({ pageParam = undefined }) =>
        getShorts({ cursor: pageParam as number | undefined }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      initialPageParam: undefined,
      staleTime: 60 * 1000,
    });

  const shorts = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    shorts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
