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
      // 사용자 행동에 따른 설정
      const userType = classifyUser(userBehavior.avgWatchTime);

      // 사용자 유형별 HLS 설정
      const hlsConfig =
        userType === "swiper"
          ? {
              // swiper: 빠른 전환, 낮은 버퍼
              startLevel: 0,
              abrEwmaFastLive: 2.0,
              abrEwmaSlowLive: 5.0,
              maxBufferLength: 10,
              abrBandwidthFactor: 0.8,
              abrBandwidthUpFactor: 0.75,
              autoLevelEnabled: true,
            }
          : {
              // settler: 안정적 전환, 높은 버퍼
              startLevel: 1,
              abrEwmaFastLive: 4.0,
              abrEwmaSlowLive: 9.0,
              maxBufferLength: 30,
              abrBandwidthFactor: 0.95,
              abrBandwidthUpFactor: 0.95,
              autoLevelEnabled: true,
            };

      console.log(
        `[ABR] 사용자: ${userType} (${userBehavior.avgWatchTime.toFixed(1)}초) → 설정:`,
        hlsConfig
      );

      hls = new Hls(hlsConfig);
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      // 초기 레벨 설정 추적
      let isInitialLevelSet = false;
      let hasUpgraded = false; // 5초 이상 시청 시 업그레이드 여부

      // 실제 레벨이 설정되는 시점 확인
      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        const currentLevelData = hls?.levels?.[data.level];
        const levelInfo = currentLevelData
          ? `${data.level}:${currentLevelData.height}p`
          : `${data.level}`;

        if (!isInitialLevelSet) {
          // 초기 설정 단계
          console.log(
            `🎯 [초기 설정] 레벨 변경: ${levelInfo} (사용자 타입: ${userType})`
          );

          // 네트워크 상황을 고려한 스마트 설정
          if (data.level !== hlsConfig.startLevel && hls) {
            const targetLevelData = hls?.levels?.[hlsConfig.startLevel];

            // 현재 레벨이 목표 레벨보다 낮으면 (네트워크 안 좋음) 그대로 유지
            if (targetLevelData && data.level < hlsConfig.startLevel) {
              console.log(
                `🌐 [초기 설정] 네트워크 안 좋음 - 낮은 레벨 ${levelInfo} 유지 (목표: ${hlsConfig.startLevel}:${targetLevelData.height}p)`
              );
              isInitialLevelSet = true;
            } else {
              // 그 외의 경우는 강제 설정
              console.log(
                `⚠️ [초기 설정] startLevel과 다름 - ${hlsConfig.startLevel}로 강제 설정`
              );
              hls.currentLevel = hlsConfig.startLevel;
            }
          } else {
            console.log(`✅ [초기 설정] 올바른 레벨로 설정됨`);
            isInitialLevelSet = true;
          }
        } else {
          // ABR에 따른 화질 전환
          console.log(
            `📡 [ABR 전환] 네트워크 상황에 따른 레벨 변경: ${levelInfo}`
          );

          // 5초 이상 시청 시 수동 업그레이드 (settler만)
          if (
            userType === "settler" &&
            !hasUpgraded &&
            video.currentTime >= 5 &&
            hls
          ) {
            const { currentLevel, levels } = hls;
            const maxLevel = (levels?.length || 0) - 1;

            if (currentLevel !== undefined && currentLevel < maxLevel) {
              console.log(
                `🚀 [수동 업그레이드] 5초 시청 달성 - 레벨 ${currentLevel} → ${currentLevel + 1}`
              );
              hls.currentLevel = currentLevel + 1;
              hasUpgraded = true;
            }
          }
        }
      });
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
