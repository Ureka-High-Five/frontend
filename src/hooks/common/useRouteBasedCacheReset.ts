import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface CacheResetRule {
  fromPattern: string; // 이전 경로 패턴
  toPattern: string; // 현재 경로 패턴
  queryKey: string[]; // 리셋할 쿼리 키
}

export function useRouteBasedCacheReset(rules: CacheResetRule[] = []) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const prevLocationRef = useRef<string>("");

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocationRef.current;

    // 각 룰을 확인하여 조건에 맞으면 캐시 리셋
    rules.forEach(({ fromPattern, toPattern, queryKey }) => {
      const shouldReset =
        prevPath.startsWith(fromPattern) && !currentPath.startsWith(toPattern);

      if (shouldReset) {
        queryClient.resetQueries({ queryKey });
      }
    });

    prevLocationRef.current = currentPath;
  }, [location.pathname, queryClient, rules]);
}

// 기본 설정된 훅
export function useShortsRouteCache() {
  useRouteBasedCacheReset([
    {
      fromPattern: "/shorts",
      toPattern: "/shorts",
      queryKey: ["shorts"],
    },
  ]);
}
