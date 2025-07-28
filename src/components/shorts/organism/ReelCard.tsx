import { useState } from "react";
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
  const [hasAudio] = useState(true); // 임시로 모든 비디오에 오디오가 있다고 가정

  const { videoRef, currentTime, duration, handleSeek, isMuted, toggleMute } =
    useVideoPlayer(reel.shortsUrl, isActive);

  const { commentTimelineMap, activeComment } = useCommentTimeline(
    reel.shortsId,
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
          muted={isMuted}
          playsInline
          preload="auto"
          className="object-cover w-full h-full"
          controls={false}>
          <track kind="captions" />
        </video>
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
        isMuted={isMuted}
        onMuteToggle={toggleMute}
        hasAudio={hasAudio}
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
