import { useEffect, useRef } from "react";
import Hls from "hls.js";
// import { useCommentQuery } from "@/hooks/queries/shorts/useCommentQuery";
// import { useLikeQuery } from "@/hooks/queries/shorts/useLikeQuery";
import type { ShortsItem } from "@/types/shorts";
import ReelOverlay from "./ReelOverlay";

interface ReelCardProps {
  reel: ShortsItem;
}

export default function ReelCard({ reel }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * server state
   */
  // const shortsLikes = useLikeQuery({ shortsId: "1", duration: "5" });
  // const shortsComments = useCommentQuery({ shortsId: "1", time: "2" });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return () => {};

    const isHLS = reel.shortsUrl.endsWith(".m3u8");

    if (!isHLS) {
      // 일반 mp4 같은 경우
      video.src = reel.shortsUrl;
      return () => {};
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari: 기본 재생
      video.src = reel.shortsUrl;
      return () => {};
    }

    if (Hls.isSupported()) {
      // 기타 브라우저: HLS.js 사용
      const hls = new Hls();
      hls.loadSource(reel.shortsUrl);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    // console.error("This browser does not support HLS.");
    return () => {};
  }, [reel.shortsUrl]);

  return (
    <div className="w-full h-screen snap-start relative bg-black" ref={cardRef}>
      <video
        ref={videoRef}
        // src={reel.shortsUrl}
        // poster={reel.shortThumbnail}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="object-cover w-full h-full"
        controls={false}
      />

      {/* 오버레이: 제목 + 액션바 */}
      <ReelOverlay title={reel.contentTitle} />
    </div>
  );
}
