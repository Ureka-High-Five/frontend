import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useCommentTimelineQuery } from "@/hooks/queries/shorts/useCommentTimelineQuery";
import type { ShortsItem, CommentWithTime } from "@/types/shorts";
import ReelOverlay from "./ReelOverlay";

interface ReelCardProps {
  reel: ShortsItem;
}

export default function ReelCard({ reel }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [activeComment, setActiveComment] = useState<CommentWithTime | null>(
    null
  );
  const [duration, setDuration] = useState(0);

  const { commentTimelineMap } = useCommentTimelineQuery({
    shortsId: String(reel.shortsId),
    currentTime,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isHLS = reel.shortsUrl.endsWith(".m3u8");
    if (!isHLS) {
      video.src = reel.shortsUrl;
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = reel.shortsUrl;
      return;
    }

    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(reel.shortsUrl);
      hls.attachMedia(video);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (hls) hls.destroy();
    };
  }, [reel.shortsUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    let lastShownTime = -1;

    const update = () => {
      const rawTime = video.currentTime;
      setCurrentTime(rawTime);

      const flooredTime = Math.floor(rawTime);

      if (flooredTime !== lastShownTime) {
        lastShownTime = flooredTime;

        const commentsAtTime = commentTimelineMap[flooredTime] || [];
        if (commentsAtTime.length > 0) {
          setActiveComment(commentsAtTime[0]);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const handleLoadedMetadata = () => {
      setDuration(Math.floor(video.duration));
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    animationFrameId = requestAnimationFrame(update);

    // eslint-disable-next-line consistent-return
    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [commentTimelineMap]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const target = Number(e.target.value);
    if (video) {
      video.currentTime = target;
    }
  };

  return (
    <div className="w-full h-screen snap-start relative bg-black" ref={cardRef}>
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

      <div className="absolute bottom-3 left-4 right-4 z-10">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
        />

        <div className="relative h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-200 ease-linear"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />

          {duration > 0 &&
            Array.from({ length: duration }).map((_, sec) => {
              const hasComment = commentTimelineMap[sec]?.length > 0;
              if (!hasComment) return null;
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`dot-${sec}`}
                  className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-white -translate-y-1/2"
                  style={{
                    left: `${(sec / duration) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
