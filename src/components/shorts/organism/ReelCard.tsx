import ReelProgressBar from "@/components/shorts/molecules/ReelProgressBar";
import { useLikeQuery } from "@/hooks/queries/shorts/useLikeQuery";
import { useCommentTimeline } from "@/hooks/shorts/useCommentTimeline";
import { useLikeTimeline } from "@/hooks/shorts/useLikeTimeline";
import { useTotalLikeCount } from "@/hooks/shorts/useTotalLikeCount";
import { useVideoPlayer } from "@/hooks/shorts/useVideoPlayer";
import type { ShortsItem } from "@/types/shorts";
import ReelOverlay from "./ReelOverlay";

interface ReelCardProps {
  reel: ShortsItem;
}

export default function ReelCard({ reel }: ReelCardProps) {
  const { videoRef, currentTime, duration, handleSeek } = useVideoPlayer(
    reel.shortsUrl
  );

  const { commentTimelineMap, activeComment } = useCommentTimeline(
    String(reel.shortsId),
    currentTime
  );

  const shortsLikes = useLikeQuery({
    shortsId: String(reel.shortsId),
    duration: "5",
  });

  const totalLikeCount = useTotalLikeCount(shortsLikes);

  const { isLikeVisible } = useLikeTimeline(currentTime, 1, shortsLikes ?? []);

  return (
    <div className="w-full h-screen snap-start relative bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="object-cover w-full h-full"
        controls={false}
      />
      <ReelOverlay
        title={reel.contentTitle}
        comment={activeComment}
        isLikeVisible={isLikeVisible}
        totalLikeCount={totalLikeCount}
      />
      <ReelProgressBar
        duration={duration}
        currentTime={currentTime}
        onSeek={handleSeek}
        commentTimelineMap={commentTimelineMap}
      />
    </div>
  );
}
