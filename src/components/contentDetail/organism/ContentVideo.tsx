import { useRef } from "react";
import { useAutoPlayVideo } from "@/hooks/common/useAutoPlayVideo";

interface ContentVideoProps {
  videoUrl: string;
}

const ContentVideo = ({ videoUrl }: ContentVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useAutoPlayVideo({
    videoRef,
    containerRef,
    videoUrl,
  });

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[768px] w-full aspect-[16/9] z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        loop
        controls={false}
      />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-custom-black" />
    </div>
  );
};

export default ContentVideo;
