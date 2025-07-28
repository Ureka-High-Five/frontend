import { useMemo } from "react";
import useUserBehaviorStore from "@/stores/useUserBehaviorStore";
import { classifyUser } from "@/utils/classifyUser";

export function useHlsConfig() {
  const { userBehavior } = useUserBehaviorStore();

  const hlsConfig = useMemo(() => {
    const userType = classifyUser(userBehavior.avgWatchTime);

    return userType === "swiper"
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
  }, [userBehavior.avgWatchTime]);

  return { hlsConfig };
}
