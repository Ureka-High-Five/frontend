import { useEffect, useRef } from "react";
import { postShortsWatchLog } from "@/apis/shorts/postShortsWatchLog";
import { useAvgWatchTimeCalculator } from "./useAvgWatchTimeCalculator";

interface Props {
  activeShortsId?: string;
  type?: "SHORTS" | "VIDEO";
}

export function useShortsWatchTimeTracker({
  activeShortsId,
  type = "SHORTS",
}: Props) {
  const prevShortsIdRef = useRef<string | undefined>(undefined);
  const prevActivatedAtRef = useRef<number>(performance.now());
  const { addWatchTime } = useAvgWatchTimeCalculator();

  useEffect(() => {
    const now = performance.now();

    if (prevShortsIdRef.current && prevActivatedAtRef.current) {
      const watchedSec = Math.floor((now - prevActivatedAtRef.current) / 1000);
      if (watchedSec > 0) {
        // API로 시청 로그 전송
        postShortsWatchLog({
          id: Number(prevShortsIdRef.current),
          watchTime: watchedSec,
          type,
        });

        // 평균 시청 시간 계산 훅에 시청 시간 전달
        addWatchTime(watchedSec);
      }
    }

    prevShortsIdRef.current = activeShortsId;
    prevActivatedAtRef.current = now;
  }, [activeShortsId, type, addWatchTime]);
}
