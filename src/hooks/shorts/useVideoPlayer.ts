import { useRef, useCallback, useState, useEffect } from "react";
import { useHlsMedia } from "./useHlsMedia";
import { useVideoTimeTracker } from "./useVideoTimeTracker";

export function useVideoPlayer(videoUrl: string, isActive: boolean = false) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useHlsMedia(videoRef, videoUrl, isActive);
  const { currentTime, duration } = useVideoTimeTracker(videoRef);

  // muted 상태가 변경될 때 비디오 요소에 반영
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  const handleSeek = useCallback((value: number) => {
    const video = videoRef.current;
    if (video) video.currentTime = value;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    videoRef,
    currentTime,
    duration,
    handleSeek,
    isMuted,
    toggleMute,
  };
}
