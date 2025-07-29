import { useState } from "react";
import { useParams } from "react-router-dom";
import ReelProgressBar from "@/components/shorts/molecules/ReelProgressBar";
import { useCommentTimeline } from "@/hooks/shorts/useCommentTimeline";
import { useShortsLikeInfo } from "@/hooks/shorts/useShortsLikeInfo";
import { useVideoPlayer } from "@/hooks/shorts/useVideoPlayer";
import { useAudioStore } from "@/stores/useAudioStore";
import type { ShortsItem } from "@/types/shorts";
import ReelOverlay from "./ReelOverlay";

interface ReelCardProps {
  reel: ShortsItem;
}

export default function ReelCard({ reel }: ReelCardProps) {
  const { id: currentShortsId } = useParams<{ id: string }>();
  const isActive = String(reel.shortsId) === currentShortsId;
  const { isMuted } = useAudioStore();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { videoRef, currentTime, duration, handleSeek } = useVideoPlayer(
    reel.shortsUrl,
    isActive
  );

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

  const handleVideoPlaying = () => {
    console.log("handleVideoPlaying");
    setIsVideoLoaded(true);
  };
  return (
    <div className="w-full h-screen-mobile snap-start relative bg-black overflow-hidden">
      {/* 이미지 & 비디오를 absolute로 겹침 */}
      <img
        src={reel.shortsThumbnail}
        alt="video thumbnail"
        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${
          isActive && isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {isActive && (
        <video
          key={reel.shortsId}
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          controls={false}
          onCanPlay={handleVideoPlaying}>
          <track kind="captions" />
        </video>
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
