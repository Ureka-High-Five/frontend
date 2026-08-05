import { getAllUsers } from "@lead-me/api/admin/getAllUsers";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { GetUsersResponse } from "@lead-me/types/admin";

export const useUsersInfiniteQuery = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<GetUsersResponse>({
      queryKey: ["allUsers"],
      queryFn: ({ pageParam = null }) =>
        getAllUsers({ cursor: pageParam as number | undefined }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      initialPageParam: null,
    });
  const allUsers = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    allUsers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
