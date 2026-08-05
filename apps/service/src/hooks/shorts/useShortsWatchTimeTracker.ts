import { useEffect, useRef } from "react";
import { postShortsWatchLog } from "@/apis/shorts/postShortsWatchLog";

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

  useEffect(() => {
    const now = performance.now();

    if (prevShortsIdRef.current && prevActivatedAtRef.current) {
      const watchedSec = Math.floor((now - prevActivatedAtRef.current) / 1000);
      if (watchedSec > 0) {
        postShortsWatchLog({
          id: Number(prevShortsIdRef.current),
          watchTime: watchedSec,
          type,
        });
      }
    }

    prevShortsIdRef.current = activeShortsId;
    prevActivatedAtRef.current = now;
  }, [activeShortsId, type]);
}
