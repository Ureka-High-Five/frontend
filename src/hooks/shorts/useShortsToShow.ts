import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useShortsByIdQuery } from "@/hooks/queries/shorts/useShortsByIdQuery";
import { useShortsInfiniteQuery } from "@/hooks/queries/shorts/useShortsInfiniteQuery";

export function useShortsToShow(currentShortsId?: string) {
  const location = useLocation();
  const { shorts, fetchNextPage, hasNextPage, isLoading } =
    useShortsInfiniteQuery();

  // 타입 안전한 ID 비교 함수
  const isSameShortsId = (shortsId: number, targetId: string) => {
    return String(shortsId) === targetId && targetId !== "";
  };

  const alreadyHasShort = useMemo(
    () =>
      !!currentShortsId &&
      shorts.some((s) => isSameShortsId(s.shortsId, currentShortsId)),
    [shorts, currentShortsId]
  );

  // /shorts 경로로 접근했을 때는 단일 쇼츠 쿼리를 비활성화하여 중복 호출 방지
  const isDirectShortsAccess = location.pathname === "/shorts";
  const shouldFetchSingleShorts =
    !!currentShortsId && !alreadyHasShort && !isDirectShortsAccess;

  const { shorts: singleShorts, isLoading: isSingleShortsLoading } =
    useShortsByIdQuery(currentShortsId ?? "", {
      enabled: shouldFetchSingleShorts,
    });

  const shortsToShow = useMemo(() => {
    // currentShortsId가 없거나 /shorts 경로로 직접 접근한 경우 기존 목록 반환
    if (!currentShortsId || isDirectShortsAccess) {
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
        ...shorts.filter((s) => !isSameShortsId(s.shortsId, currentShortsId)),
      ];
    }

    // 단일 쇼츠 로딩 실패 시 기존 목록 반환
    return shorts.filter(Boolean);
  }, [
    currentShortsId,
    isDirectShortsAccess,
    alreadyHasShort,
    isSingleShortsLoading,
    singleShorts,
    shorts,
  ]);

  return {
    shortsToShow,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoading || (shouldFetchSingleShorts && isSingleShortsLoading),
  };
}
