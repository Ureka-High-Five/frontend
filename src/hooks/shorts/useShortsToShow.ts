import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";

export function useShortsToShow(currentShortsId?: string) {
  const { shorts, fetchNextPage, hasNextPage, isLoading } =
    useShortsInfiniteQuery();

  const isSingleFetchNeeded =
    !!currentShortsId &&
    !shorts.some((s) => String(s.shortsId) === currentShortsId);

  const singleShorts = useShortsByIdQuery(currentShortsId ?? "", {
    enabled: isSingleFetchNeeded,
  });

  const shortsToShow = isSingleFetchNeeded
    ? [
        singleShorts,
        ...shorts.filter((s) => String(s.shortsId) !== currentShortsId),
      ]
    : shorts;

  return {
    shortsToShow,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
}
