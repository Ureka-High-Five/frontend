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

  const { shorts: singleShorts, isLoading: isSingleShortsLoading } =
    useShortsByIdQuery(currentShortsId ?? "", {
      enabled: !!currentShortsId && !alreadyHasShort,
    });

  const shortsToShow = useMemo(() => {
    // currentShortsId가 없으면 기존 목록 반환
    if (!currentShortsId) {
      return shorts.filter(Boolean);
    }

    // 이미 목록에 있으면 기존 목록 반환
    if (alreadyHasShort) {
      return shorts.filter(Boolean);
    }

    // 단일 쇼츠가 아직 로딩 중이면 빈 배열 반환 (로딩 완료까지 기다림)
    if (isSingleShortsLoading) {
      return [];
    }

    // 단일 쇼츠를 성공적으로 가져왔으면 맨 앞에 추가
    if (singleShorts) {
      return [
        singleShorts,
        ...shorts.filter((s) => String(s.shortsId) !== currentShortsId),
      ];
    }

    // 단일 쇼츠 로딩 실패 시 기존 목록 반환
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
    isLoading: isLoading || isSingleShortsLoading,
  };
}
