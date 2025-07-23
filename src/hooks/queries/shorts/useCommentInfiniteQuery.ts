import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllShortsComments } from "@/apis/shorts/getAllShortsComments";
import type { GetAllCommentsResponse } from "@/types/shorts";

export const useCommentInfiniteQuery = (shortsId: string) => {
  const {
    data: allComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<GetAllCommentsResponse>({
    queryKey: ["comments"],
    queryFn: ({ pageParam = shortsId }) =>
      getAllShortsComments({
        shortsId,
        cursor: pageParam as number | undefined,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: shortsId,
  });

  return {
    allComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
