import { useEffect, useRef, useState } from "react";
import type { LikeTimeline } from "@/types/shorts";

export function useLikeTimeline(
  currentTime: number,
  threshold: number = 1,
  likeTimelineMap: LikeTimeline[] = []
) {
  const [isLikeVisible, setIsLikeVisible] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const flooredTime = Math.floor(currentTime);
    const match = likeTimelineMap.find((entry) => entry.time === flooredTime);

    if (
      match &&
      match.count >= threshold &&
      lastTimeRef.current !== flooredTime
    ) {
      setIsLikeVisible(true); // 하트 애니메이션 표시
      setCurrentLikeCount(match.count);
      lastTimeRef.current = flooredTime;

      // 1초 뒤 애니메이션 숨기기
      setTimeout(() => setIsLikeVisible(false), 1000);
    }
  }, [currentTime, likeTimelineMap, threshold]);

  return {
    isLikeVisible,
    currentLikeCount,
  };
}
