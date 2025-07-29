import { useEffect, useRef, useState, type RefObject } from "react";
import Hls from "hls.js";

interface UseAutoPlayVideoOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  videoUrl: string;
  threshold?: number;
  delayMs?: number;
  loop?: boolean;
}

export function useAutoPlayVideo({
  videoRef,
  containerRef,
  videoUrl,
  threshold = 0.7,
  delayMs = 0,
}: UseAutoPlayVideoOptions): boolean {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      // eslint-disable-next-line consistent-return
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    }
  }, [videoUrl, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!video) return;

        if (entry.isIntersecting) {
          timeoutRef.current = setTimeout(() => {
            video
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {});
          }, delayMs);
        } else {
          video.pause();
          setIsPlaying(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
      },
      { threshold }
    );

    observer.observe(container);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [videoRef, containerRef, threshold, delayMs]);

  return isPlaying;
}
