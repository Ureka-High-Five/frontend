import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useAutoPlayVideo } from "@/hooks/common/useAutoPlayVideo";

interface ContentVideoProps {
  videoUrl: string;
  posterUrl: string;
  isMuted?: boolean;
  contentTitle?: string;
}

const ContentVideo = ({
  videoUrl,
  posterUrl,
  isMuted = true,
  contentTitle = "콘텐츠",
}: ContentVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useAutoPlayVideo({
    videoRef,
    containerRef,
    videoUrl,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsVideoReady(true);
    video.addEventListener("canplay", handleCanPlay);
    // eslint-disable-next-line consistent-return
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[768px] w-full aspect-[16/9] z-0 overflow-hidden">
      <img
        src={posterUrl}
        alt={`${contentTitle} 포스터`}
        className={clsx(
          "absolute w-full h-full object-cover transition-opacity duration-700",
          isVideoReady ? "opacity-0" : "opacity-100"
        )}
      />

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        playsInline
        loop
        controls={false}
        preload="metadata"
        aria-label={`${contentTitle} 예고편 영상`}
        aria-describedby="video-description">
        <track kind="captions" />
      </video>

      <div id="video-description" className="sr-only">
        {contentTitle}의 예고편이 재생되고 있습니다. 음소거 상태는{" "}
        {isMuted ? "켜져" : "꺼져"} 있습니다.
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-custom-black/30 to-custom-black" />
    </div>
  );
};

export default ContentVideo;
