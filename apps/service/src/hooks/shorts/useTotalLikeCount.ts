import { useMemo } from "react";
import type { LikeTimeline } from "@lead-me/types/shorts";

export function useTotalLikeCount(likeTimelineMap: LikeTimeline[] = []) {
  const totalLikeCount = useMemo(() => {
    return likeTimelineMap.reduce((sum, item) => sum + item.count, 0);
  }, [likeTimelineMap]);

  return totalLikeCount;
}
