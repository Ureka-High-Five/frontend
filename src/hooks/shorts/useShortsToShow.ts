import { useMemo } from "react";
import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";

export function useShortsToShow(currentShortsId?: string) {
  const { shorts, fetchNextPage, hasNextPage, isLoading } =
    useShortsInfiniteQuery(); 
    
  const alreadyHasShort = useMemo(
    () => shorts.some((s) => String(s.shortsId) === currentShortsId),
    [shorts, currentShortsId]
  );

  const singleShorts = useShortsByIdQuery(currentShortsId ?? "", {
    enabled: !!currentShortsId && !alreadyHasShort,
  });

  const shortsToShow =
    !!currentShortsId && !alreadyHasShort
      ? [
          ...(singleShorts ? [singleShorts] : []),
          ...shorts.filter((s) => String(s.shortsId) !== currentShortsId),
        ]
      : shorts.filter(Boolean);

  return {
    shortsToShow,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
}
