import { useLikeQuery } from "@/hooks/queries/shorts/useLikeQuery";
import { useTotalLikeCount } from "@/hooks/shorts/useTotalLikeCount";
import type { ShortsItem } from "@/types/shorts";
import { useLikeTimeline } from "./useLikeTimeline";

const LIKE_DURATION = "5";

export function useShortsLikeInfo({
  reel,
  currentTime,
  isActive = false,
}: {
  reel: ShortsItem;
  currentTime: number;
  isActive?: boolean;
}) {
  const { shortsId } = reel;

  const likeData = useLikeQuery({
    shortsId: String(shortsId),
    duration: LIKE_DURATION,
    enabled: isActive,
  });

  const shortsLikes = likeData?.likeTimeLines ?? [];
  const liked = likeData?.liked ?? false;

  const totalLikeCount = useTotalLikeCount(shortsLikes);
  const { isLikeVisible } = useLikeTimeline(currentTime, 1, shortsLikes ?? []);

  return {
    shortsLikes,
    totalLikeCount,
    liked,
    isLikeVisible,
  };
}
