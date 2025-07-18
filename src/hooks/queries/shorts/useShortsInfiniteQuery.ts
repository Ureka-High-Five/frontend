import { useInfiniteQuery } from "@tanstack/react-query";
import { getShorts } from "@/apis/shorts/getShorts";
import type { GetShortsResponse } from "@/types/shorts";

export const useShortsInfiniteQuery = () => {
  return useInfiniteQuery<GetShortsResponse>({
    queryKey: ["shorts"],
    queryFn: ({ pageParam = undefined }) => getShorts({ cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    keepPreviousData: true,
  });
};
