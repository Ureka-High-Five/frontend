import { useMemo } from "react";
import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";

export function useShortsToShow(currentShortsId?: string) {
  const { shorts, fetchNextPage, hasNextPage } = useShortsInfiniteQuery();

  const isSameShortsId = (shortsId: number, targetId: string) => {
    return String(shortsId) === targetId && targetId !== "";
  };

  const alreadyHasShort = useMemo(
    () =>
      !!currentShortsId &&
      shorts.some((s) => isSameShortsId(s.shortsId, currentShortsId)),
    [shorts, currentShortsId]
  );

  const { shorts: singleShorts } = useShortsByIdQuery(currentShortsId ?? "", {
    enabled: !!currentShortsId && !alreadyHasShort,
  });

  const shortsToShow = useMemo(() => {
    if (!currentShortsId || alreadyHasShort) return shorts;
    if (!singleShorts) return shorts;
    return [singleShorts, ...shorts];
  }, [currentShortsId, alreadyHasShort, shorts, singleShorts]);

  return {
    shortsToShow,
    fetchNextPage,
    hasNextPage,
  };
}
