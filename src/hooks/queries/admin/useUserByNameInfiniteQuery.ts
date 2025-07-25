import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserByName } from "@/apis/admin/getUserByName";
import type { GetUsersResponse } from "@/types/admin";

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
