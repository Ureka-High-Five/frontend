import { useCallback, useRef } from "react";
import Hls from "hls.js";

export function useHlsLevelManager() {
  const isInitialLevelSetRef = useRef(false);

  const setupLevelManager = useCallback((hls: Hls, startLevel: number) => {
    // 초기 레벨 설정 상태 초기화
    isInitialLevelSetRef.current = false;

    // 실제 레벨이 설정되는 시점 확인
    const handleLevelSwitched = (_: string, data: { level: number }) => {
      if (!isInitialLevelSetRef.current) {
        // 네트워크 상황을 고려한 스마트 설정
        if (data.level !== startLevel) {
          const targetLevelData = hls?.levels?.[startLevel];
          const hlsInstance = hls;

          // 현재 레벨이 목표 레벨보다 낮으면 (네트워크 안 좋음) 그대로 유지
          if (targetLevelData && data.level < startLevel) {
            isInitialLevelSetRef.current = true;
          } else {
            // 그 외의 경우는 강제 설정
            hlsInstance.currentLevel = startLevel;
          }
        } else {
          isInitialLevelSetRef.current = true;
        }
      }
    };

    hls.on(Hls.Events.LEVEL_SWITCHED, handleLevelSwitched);

    // cleanup 함수 반환
    return () => {
      hls.off(Hls.Events.LEVEL_SWITCHED, handleLevelSwitched);
    };
  }, []);

  const resetLevelManager = useCallback(() => {
    isInitialLevelSetRef.current = false;
  }, []);

  return {
    setupLevelManager,
    resetLevelManager,
  };
}
