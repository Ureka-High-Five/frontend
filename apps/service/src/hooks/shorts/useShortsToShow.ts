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

  const { shorts: singleShorts, isLoading: isSingleShortsLoading } =
    useShortsByIdQuery(currentShortsId ?? "", {
      enabled: !!currentShortsId && !alreadyHasShort,
    });

  const shortsToShow = useMemo(() => {
    // ID 없으면 기존 리스트 반환
    if (!currentShortsId) {
      return shorts.filter(Boolean);
    }

    // 이미 포함되어 있으면 기존 리스트 반환
    if (alreadyHasShort) {
      return shorts.filter(Boolean);
    }

    // 단일 쇼츠 로딩 중이면 Suspense fallback이 표시될 것이므로, 일단 비워둠
    if (isSingleShortsLoading) {
      return [];
    }

    // 단일 쇼츠 성공 시, 가장 앞에 추가
    if (singleShorts) {
      return [
        singleShorts,
        ...shorts.filter((s) => !isSameShortsId(s.shortsId, currentShortsId)),
      ];
    }

    // 실패 fallback: 기존 리스트
    return shorts.filter(Boolean);
  }, [
    currentShortsId,
    alreadyHasShort,
    isSingleShortsLoading,
    singleShorts,
    shorts,
  ]);

  return {
    shortsToShow,
    fetchNextPage,
    hasNextPage,
  };
}
