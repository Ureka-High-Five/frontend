import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllShortsComments } from "@/apis/shorts/getAllShortsComments";
import type { GetAllCommentsResponse } from "@/types/shorts";

export const useCommentInfiniteQuery = (
  shortsId: string,
  commentId: number,
  isDrawerOpen: boolean
) => {
  const {
    data: allComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<GetAllCommentsResponse>({
    queryKey: ["comments", shortsId, commentId], // shortsId로 캐시 분리
    queryFn: ({ pageParam = commentId }) =>
      getAllShortsComments({
        shortsId,
        cursor: pageParam as number,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: commentId,
    enabled: !!commentId && isDrawerOpen,
  });

  return {
    allComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
