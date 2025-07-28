import { useRef } from "react";
import useUserBehaviorStore from "@/stores/useUserBehaviorStore";

export function useAvgWatchTimeCalculator() {
  const watchTimesRef = useRef<number[]>([]);
  const { setAvgWatchTime } = useUserBehaviorStore();

  const addWatchTime = (watchTime: number) => {
    // 시청 시간 추가
    watchTimesRef.current.push(watchTime);

    // 최근 10개의 시청 시간으로 평균 계산
    const recentWatchTimes = watchTimesRef.current.slice(-10);
    const avgWatchTime =
      recentWatchTimes.reduce((sum, time) => sum + time, 0) /
      recentWatchTimes.length;

    // 사용자 행동 스토어에 평균 시청 시간 저장
    setAvgWatchTime(avgWatchTime);
  };

  return { addWatchTime };
}
