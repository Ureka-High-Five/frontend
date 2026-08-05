import { useEffect } from "react";
import Hls from "hls.js";
import useUserBehaviorStore from "@/stores/useUserBehaviorStore";
import { classifyUser } from "@/utils/classifyUser";
import { emitVideoEvent, type VideoEventType } from "./videoEventBus";

// 이벤트 타입 상수
const EVENT_TYPES: VideoEventType[] = [
  "play",
  "pause",
  "seeking",
  "seeked",
  "loadedmetadata",
  "timeupdate",
];

// 이벤트 리스너 추가
function addEventListeners(videoElement: HTMLVideoElement) {
  const handlers: Record<VideoEventType, (e: Event) => void> =
    EVENT_TYPES.reduce(
      (acc, type) => {
        acc[type] = (e: Event) => emitVideoEvent(type, e);
        return acc;
      },
      {} as Record<VideoEventType, (e: Event) => void>
    );

  EVENT_TYPES.forEach((type) => {
    videoElement.addEventListener(type, handlers[type]);
  });

  return handlers;
}

// 이벤트 리스너 제거
function removeEventListeners(
  video: HTMLVideoElement,
  eventHandlers: Record<VideoEventType, (e: Event) => void>
) {
  EVENT_TYPES.forEach((type) => {
    video.removeEventListener(type, eventHandlers[type]);
  });
}

// HLS 설정 생성
function createHlsConfig(userType: "swiper" | "settler") {
  if (userType === "swiper") {
    return {
      // 스와이퍼: 빠른 시작, 메모리 절약
      maxBufferLength: 10, // 10초만 미리 버퍼링
      maxBufferSize: 20000000, // 20MB 제한
      fragLoadingTimeOut: 10000, // 10초 로딩 타임아웃
      backBufferLength: 30, // 뒤쪽 30초 보관
      startLevel: 0, // 낮은 해상도부터 시작
      abrEwmaDefaultEstimate: 500000, // 초기 대역폭 500kbps
      maxStartBufferLength: 2, // 시작 버퍼링 2초
    };
  }

  return {
    // 정착자: 안정적 재생, 끊김 방지
    maxBufferLength: 30, // 30초 미리 버퍼링
    maxBufferSize: 60000000, // 60MB 허용
    fragLoadingTimeOut: 20000, // 20초 로딩 타임아웃
    backBufferLength: 90, // 뒤쪽 90초 보관
    startLevel: 0, // 낮은 해상도부터 시작
    abrEwmaDefaultEstimate: 800000, // 초기 대역폭 800kbps
    maxStartBufferLength: 3, // 시작 버퍼링 3초
  };
}

// 비디오 정리
function cleanupVideo(video: HTMLVideoElement) {
  if (video.src) {
    // eslint-disable-next-line no-param-reassign
    video.src = "";
  }
}

// 네이티브 HLS 설정
function setupNativeHls(video: HTMLVideoElement, videoUrl: string) {
  // eslint-disable-next-line no-param-reassign
  video.src = videoUrl;

  return addEventListeners(video);
}

// Hls.js 설정
function setupHlsJs(
  video: HTMLVideoElement,
  videoUrl: string,
  userType: "swiper" | "settler"
) {
  if (!Hls.isSupported()) {
    return { hls: null, eventHandlers: null };
  }

  const hlsConfig = createHlsConfig(userType);
  const hls = new Hls(hlsConfig);

  hls.loadSource(videoUrl);
  hls.attachMedia(video);

  const eventHandlers = addEventListeners(video);

  return { hls, eventHandlers };
}

export function useHlsMedia(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  videoUrl: string,
  isActive: boolean = false
) {
  const { userBehavior } = useUserBehaviorStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // 비활성화된 경우 정리
    if (!isActive) {
      cleanupVideo(video);
      return undefined;
    }

    const isHLS = videoUrl.endsWith(".m3u8");
    const userType = classifyUser(userBehavior.avgWatchTime);

    let eventHandlers: Record<VideoEventType, (e: Event) => void> | null = null;
    let hls: Hls | null = null;

    // 네이티브 HLS 사용 가능한 경우
    if (!isHLS || video.canPlayType("application/vnd.apple.mpegurl")) {
      eventHandlers = setupNativeHls(video, videoUrl);
    } else {
      // Hls.js 사용
      const result = setupHlsJs(video, videoUrl, userType);
      hls = result.hls;
      eventHandlers = result.eventHandlers;
    }

    // Cleanup 함수
    return () => {
      if (eventHandlers) {
        removeEventListeners(video, eventHandlers);
      }
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoUrl, videoRef, isActive, userBehavior]);
}
