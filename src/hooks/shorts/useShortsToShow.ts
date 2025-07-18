// src/hooks/shorts/useShortsToShow.ts
import { useMemo } from "react";
import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";

export function useShortsToShow(currentShortsId?: string) {
  // 무한 스크롤은 항상 cursor 없이 호출 (목록의 첫 페이지부터)
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
      // 단건 + 무한 스크롤 목록을 합침 (중복 제거)
      const single = singleShorts ? [singleShorts] : [];
      const filtered = flattenedShorts.filter(
        (s) => String(s.shortsId) !== currentShortsId
      );
      return [...single, ...filtered];
    }
    return flattenedShorts;
  }, [isSingleFetchNeeded, flattenedShorts, singleShorts, currentShortsId]);

  return {
    shortsToShow,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
}
