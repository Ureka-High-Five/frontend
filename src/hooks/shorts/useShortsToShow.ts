// src/hooks/shorts/useShortsToShow.ts
import { useMemo } from "react";
import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";

export function useShortsToShow(currentShortsId?: string) {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useShortsInfiniteQuery();
  const flattenedShorts = useMemo(
    () => data?.pages.flatMap((page) => page?.items ?? []) ?? [],
    [data]
  );

  const isSingleFetchNeeded =
    !!currentShortsId &&
    !flattenedShorts.some((s) => String(s.shortsId) === currentShortsId);

  const singleShorts = useShortsByIdQuery(currentShortsId ?? "", {
    enabled: isSingleFetchNeeded,
  });

  const shortsToShow = useMemo(() => {
    if (isSingleFetchNeeded) {
      return singleShorts ? [singleShorts] : [];
    }
    return flattenedShorts;
  }, [isSingleFetchNeeded, flattenedShorts, singleShorts]);

  return {
    shortsToShow,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
}
