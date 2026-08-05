import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getShorts } from "@/apis/shorts/getShorts";
import type { GetShortsResponse } from "@lead-me/types/shorts";

export const useShortsInfiniteQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<GetShortsResponse>({
      queryKey: ["shorts"],
      queryFn: ({ pageParam = null }) =>
        getShorts({ cursor: pageParam as number }),
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor === null ? 0 : lastPage.nextCursor;
      },
      initialPageParam: null,
      staleTime: 60 * 1000,
    });

  const shorts = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    shorts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
