import { useInfiniteQuery } from "@tanstack/react-query";
import getMyCuration from "@/apis/my/curation/getMyCuration";
import type { MyCurationResponse, Curation } from "@/types/curation";

const useMyCurationInfiniteQuery = (isEditor: boolean, size: number = 10) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<MyCurationResponse>({
      queryKey: ["myCurations"],
      queryFn: ({ pageParam = "" }) => getMyCuration(pageParam as string, size),
      initialPageParam: "",
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? "") : undefined,
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      enabled: isEditor,
    });

  const curations: Curation[] =
    data?.pages.flatMap((page) => page.items ?? []) ?? [];

  return {
    curations,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useMyCurationInfiniteQuery;
