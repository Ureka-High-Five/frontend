import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchContents } from "@/apis/home/getSearchContents";
import type { GetSearchContentsResponse } from "@/types/search";

export const useSearchContentsInfiniteQuery = (input: string, size = 10) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GetSearchContentsResponse>({
      queryKey: ["search", input, size],
      queryFn: ({ pageParam = undefined }) =>
        getSearchContents({
          input,
          cursor: pageParam as number | undefined,
          size,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      initialPageParam: undefined,
      enabled: !!input,
      staleTime: 60 * 1000,
    });

  const searchContents = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    searchContents,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
