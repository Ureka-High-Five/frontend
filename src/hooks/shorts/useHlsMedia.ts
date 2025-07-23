import { useEffect } from "react";
import Hls from "hls.js";
import { emitVideoEvent, type VideoEventType } from "./videoEventBus";

export function useHlsMedia(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  videoUrl: string
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isHLS = videoUrl.endsWith(".m3u8");

    if (!isHLS || video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      return;
    }

    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    }

    const eventTypes: VideoEventType[] = [
      "play",
      "pause",
      "seeking",
      "seeked",
      "loadedmetadata",
      "timeupdate",
    ];

    const handlers: Record<VideoEventType, (e: Event) => void> =
      eventTypes.reduce(
        (acc, type) => {
          acc[type] = (e: Event) => emitVideoEvent(type, e);
          return acc;
        },
        {} as Record<VideoEventType, (e: Event) => void>
      );

    eventTypes.forEach((type) => {
      video.addEventListener(type, handlers[type]);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      eventTypes.forEach((type) => {
        video.removeEventListener(type, handlers[type]);
      });
      if (hls) hls.destroy();
    };
  }, [videoUrl, videoRef]);
}
