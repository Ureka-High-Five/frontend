import { useRef, useCallback } from "react";
import { useHlsMedia } from "./useHlsMedia";
import { useVideoTimeTracker } from "./useVideoTimeTracker";

export function useVideoPlayer(videoUrl: string) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useHlsMedia(videoRef, videoUrl);
  const { currentTime, duration } = useVideoTimeTracker(videoRef);

  const handleSeek = useCallback((value: number) => {
    const video = videoRef.current;
    if (video) video.currentTime = value;
  }, []);

  return {
    videoRef,
    currentTime,
    duration,
    handleSeek,
  };
}
