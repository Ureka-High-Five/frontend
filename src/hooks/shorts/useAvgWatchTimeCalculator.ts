import { useRef } from "react";
import useUserBehaviorStore from "@/stores/useUserBehaviorStore";

export function useAvgWatchTimeCalculator() {
  const watchTimesRef = useRef<number[]>([]);
  const { setAvgWatchTime } = useUserBehaviorStore();

  const addWatchTime = (watchTime: number) => {
    // 시청 시간 추가
    watchTimesRef.current.push(watchTime);

    // 최근 5개의 시청 시간으로 가중 평균 계산 (쇼츠 특성 고려)
    const recentWatchTimes = watchTimesRef.current.slice(-5);

    // 최근 시청 시간에 더 높은 가중치 적용
    const weightedSum = recentWatchTimes.reduce((sum, time, index) => {
      const weight = index + 1; // 최근일수록 높은 가중치 (1, 2, 3, 4, 5)
      return sum + time * weight;
    }, 0);

    const totalWeight = recentWatchTimes.reduce(
      (sum, _, index) => sum + (index + 1),
      0
    );
    const avgWatchTime = weightedSum / totalWeight;

    // 사용자 행동 스토어에 평균 시청 시간 저장
    setAvgWatchTime(avgWatchTime);

    // 디버깅용 로그 (필요시 주석 해제)
    // console.log(`[가중평균] 시청시간: ${recentWatchTimes}, 가중평균: ${avgWatchTime.toFixed(2)}초`);
  };

  return { addWatchTime };
}
