import { useEffect } from "react";
import Hls from "hls.js";
import { useHlsConfig } from "./useHlsConfig";
import { useHlsLevelManager } from "./useHlsLevelManager";
import { emitVideoEvent, type VideoEventType } from "./videoEventBus";

export function useHlsMedia(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  videoUrl: string,
  isActive: boolean = false
) {
  const { hlsConfig } = useHlsConfig();
  const { setupLevelManager } = useHlsLevelManager();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 비활성화된 경우 HLS 인스턴스 정리
    if (!isActive) {
      if (video.src) {
        video.src = "";
      }
      return;
    }

    const isHLS = videoUrl.endsWith(".m3u8");

    if (!isHLS || video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      return;
    }

    let hls: Hls | null = null;
    let levelManagerCleanup: (() => void) | null = null;

    if (Hls.isSupported()) {
      hls = new Hls(hlsConfig);
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      // HLS 레벨 관리자 설정
      levelManagerCleanup = setupLevelManager(hls, hlsConfig.startLevel);
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
      if (levelManagerCleanup) levelManagerCleanup();
      if (hls) hls.destroy();
    };
  }, [videoUrl, videoRef, isActive, hlsConfig, setupLevelManager]);
}
