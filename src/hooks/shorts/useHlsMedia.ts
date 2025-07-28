import { useEffect } from "react";
import Hls from "hls.js";
import useUserBehaviorStore from "@/stores/useUserBehaviorStore";
import { classifyUser } from "@/utils/classifyUser";
import { emitVideoEvent, type VideoEventType } from "./videoEventBus";

export function useHlsMedia(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  videoUrl: string,
  isActive: boolean = false
) {
  const { userBehavior } = useUserBehaviorStore();

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
    if (Hls.isSupported()) {
      // 사용자 행동에 따른 버퍼링 전략 설정
      const userType = classifyUser(userBehavior.avgWatchTime);

      const hlsConfig =
        userType === "swiper"
          ? {
              // 스와이퍼: 빠른 시작, 메모리 절약
              maxBufferLength: 10, // 10초만 미리 버퍼링
              maxBufferSize: 20000000, // 20MB 제한
              fragLoadingTimeOut: 10000, // 10초 로딩 타임아웃
              backBufferLength: 30, // 뒤쪽 30초 보관
            }
          : {
              // 정착자: 안정적 재생, 끊김 방지
              maxBufferLength: 30, // 30초 미리 버퍼링
              maxBufferSize: 60000000, // 60MB 허용
              fragLoadingTimeOut: 20000, // 20초 로딩 타임아웃
              backBufferLength: 90, // 뒤쪽 90초 보관
            };

      // 버퍼링 최적화된 HLS 초기화
      hls = new Hls(hlsConfig);

      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      // 사용자 행동에 따른 버퍼링 전략 최적화 (오디오 안전)
      // hls.on(Hls.Events.MANIFEST_LOADED, () => {
      //   const userType = classifyUser(userBehavior.avgWatchTime);

      //   if (userType === "swiper") {
      //     // 스와이퍼: 더 공격적인 다운그레이드, 보수적 업그레이드
      //     hls!.autoLevelCapping = 1; // 최대 레벨 제한
      //   } else {
      //     // 정착자: 더 높은 품질까지 허용
      //     hls!.autoLevelCapping = 3; // 더 높은 레벨까지 허용
      //   }
      // });
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
  }, [videoUrl, videoRef, isActive]);
}
