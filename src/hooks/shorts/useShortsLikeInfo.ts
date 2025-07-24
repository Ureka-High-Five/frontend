import { useLikeQuery } from "@/hooks/queries/shorts/useLikeQuery";
import { useTotalLikeCount } from "@/hooks/shorts/useTotalLikeCount";
import type { ShortsItem } from "@/types/shorts";
import { useLikeTimeline } from "./useLikeTimeline";

export function useShortsLikeInfo({
  reel,
  currentTime,
}: {
  reel: ShortsItem;
  currentTime: number;
}) {
  const { shortsId } = reel;

  const likeData = useLikeQuery({
    shortsId: String(shortsId),
    duration: "5",
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
