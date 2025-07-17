import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchContents } from '@/apis/home/getSearchContents'; 
import type { GetSearchContentsResponse } from '@/types/search'; 

export const useSearchContentsInfiniteQuery = (input: string) => {
  return useInfiniteQuery<GetSearchContentsResponse>({
    queryKey: ['search', input],
    queryFn: ({ pageParam = undefined }) =>
    getSearchContents({ input, cursor: pageParam as number | undefined }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
    enabled: !!input,
  });
};
