import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Heart } from "lucide-react";
import type { ShortsItem } from "@/types/shorts";
import ReelTitle from "../atom/ReelTitle";
import ReelActionBar from "../molecules/ReelActionBar";

interface ReelCardProps {
  reel: ShortsItem;
}

export default function ReelCard({ reel }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const isHLS = reel.shortsUrl.endsWith(".m3u8");

    if (!isHLS) {
      // 일반 mp4 같은 경우
      video.src = reel.shortsUrl;
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari: 기본 재생
      video.src = reel.shortsUrl;
      return;
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

    console.error("This browser does not support HLS.");
  }, [reel.shortsUrl]);

  return (
    <div className="w-full h-screen snap-start relative bg-black">
      <video
        ref={videoRef}
        // src={reel.shortsUrl}
        poster={reel.shortThumbnail}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="object-cover w-full h-full"
        controls={false}
      />

      {/* 오버레이: 제목 + 액션바 */}
      <div className="absolute bottom-0 left-0 w-full px-4 pb-5 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2">
        <div className="flex items-center justify-between pb-2">
          <ReelTitle title={reel.contentTitle} />
          <Heart className="w-5 h-5 text-white" />
        </div>
        <ReelActionBar />
      </div>
    </div>
  );
}
