import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { postShortsWatchLog } from "@/apis/shorts/postShortsWatchLog";
import ReelProgressBar from "@/components/shorts/molecules/ReelProgressBar";
import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
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
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // isActive가 변경될 때 비디오 로드 상태 초기화
  useEffect(() => {
    if (!isActive) {
      setIsVideoLoaded(false);
    }
  }, [isActive]);

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
    setIsVideoLoaded(true);
  };

  const handleExitShorts = () => {
    const watchedSec = Math.floor(currentTime);
    if (watchedSec > 0) {
      postShortsWatchLog({
        id: reel.shortsId,
        watchTime: watchedSec,
        type: "SHORTS",
      }).catch((e) => console.error("시청 로그 전송 실패", e));
    }

    navigate(PATH.HOME);
  };

  return (
    <div className="w-full h-screen-mobile relative bg-black overflow-hidden">
      <div className="absolute top-4 left-2 z-30">
        <Button
          variant="ghost"
          onClick={handleExitShorts}
          className="text-white hover:bg-white/20 hover:text-white">
          <X className="w-6 h-6" />
        </Button>
      </div>
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
