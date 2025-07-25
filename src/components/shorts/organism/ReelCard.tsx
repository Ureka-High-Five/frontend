import { useParams } from "react-router-dom";
import ReelProgressBar from "@/components/shorts/molecules/ReelProgressBar";
import { useCommentTimeline } from "@/hooks/shorts/useCommentTimeline";
import { useShortsLikeInfo } from "@/hooks/shorts/useShortsLikeInfo";
import { useVideoPlayer } from "@/hooks/shorts/useVideoPlayer";
import type { ShortsItem } from "@/types/shorts";
import ReelOverlay from "./ReelOverlay";

interface ReelCardProps {
  reel: ShortsItem;
}

export default function ReelCard({ reel }: ReelCardProps) {
  const { id: currentShortsId } = useParams<{ id: string }>();
  const isActive = String(reel.shortsId) === currentShortsId;

  const { videoRef, currentTime, duration, handleSeek } = useVideoPlayer(
    reel.shortsUrl,
    isActive
  );

  const { commentTimelineMap, activeComment } = useCommentTimeline(
    String(reel.shortsId),
    currentTime,
    isActive
  );

  const { totalLikeCount, liked, isLikeVisible } = useShortsLikeInfo({
    reel,
    currentTime,
    isActive,
  });

  return (
    <div className="w-full h-screen snap-start relative bg-black">
      {isActive ? (
        <video
          key={reel.shortsId}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="object-cover w-full h-full"
          controls={false}
        />
      ) : (
        <div className="object-cover w-full h-full bg-black" />
      )}
      <ReelOverlay
        title={reel.contentTitle}
        contentId={reel.contentId}
        comment={activeComment}
        isLikeVisible={isLikeVisible}
        totalLikeCount={totalLikeCount}
        isUserLiked={liked}
        shortsId={reel.shortsId}
        videoRef={videoRef}
        currentTime={currentTime}
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
