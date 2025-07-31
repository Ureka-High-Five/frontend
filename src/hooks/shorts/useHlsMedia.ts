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
              // 성능 최적화: 낮은 해상도부터 시작
              startLevel: 0, // 자동 선택이지만 낮은 해상도 선호
              abrEwmaDefaultEstimate: 500000, // 초기 대역폭을 500kbps로 낮게 설정
              maxStartBufferLength: 2, // 시작 버퍼링 시간 단축 (2초)
            }
          : {
              // 정착자: 안정적 재생, 끊김 방지
              maxBufferLength: 30, // 30초 미리 버퍼링
              maxBufferSize: 60000000, // 60MB 허용
              fragLoadingTimeOut: 20000, // 20초 로딩 타임아웃
              backBufferLength: 90, // 뒤쪽 90초 보관
              // 성능 최적화: 낮은 해상도부터 시작
              startLevel: 0, // 자동 선택이지만 낮은 해상도 선호
              abrEwmaDefaultEstimate: 800000, // 초기 대역폭을 800kbps로 설정
              maxStartBufferLength: 3, // 시작 버퍼링 시간 단축 (3초)
            };

      // 버퍼링 최적화된 HLS 초기화
      hls = new Hls(hlsConfig);

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
  }, [videoUrl, videoRef, isActive, userBehavior]);
}
