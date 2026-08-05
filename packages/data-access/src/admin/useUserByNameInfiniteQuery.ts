import { getUserByName } from "@lead-me/api/admin/getUserByName";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { GetUsersResponse } from "@lead-me/types/admin";

export const useUserByNameInfiniteQuery = (name: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<GetUsersResponse>({
      queryKey: ["users", name],
      queryFn: ({ pageParam = null }) =>
        getUserByName({
          name,
          cursor: pageParam as number | undefined,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      initialPageParam: null,
      enabled: !!name,
    });
  const users = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
