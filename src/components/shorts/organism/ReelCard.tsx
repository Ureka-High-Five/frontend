import ReelProgressBar from "@/components/shorts/molecules/ReelProgressBar";
import { useCommentTimeline } from "@/hooks/shorts/useCommentTimeline";
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
      <ReelOverlay title={reel.contentTitle} comment={activeComment} />
      <ReelProgressBar
        duration={duration}
        currentTime={currentTime}
        onSeek={handleSeek}
        commentTimelineMap={commentTimelineMap}
      />
    </div>
  );
}
