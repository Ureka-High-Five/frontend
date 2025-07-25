import { useQuery } from "@tanstack/react-query";
import { getShortsLike } from "@/apis/shorts/getShortsLike";
import type { ShortsDuration } from "@/types/shorts";

export const useLikeQuery = ({
  shortsId,
  duration,
  enabled = true,
}: ShortsDuration & { enabled?: boolean }) => {
  const { data: shortsLikes } = useQuery({
    queryKey: ["shortsLike", shortsId],
    queryFn: () => getShortsLike(shortsId, duration),
    enabled: enabled && !!shortsId && !!duration,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
    placeholderData: (previousData) => previousData, // 이전 데이터를 placeholder로 사용
  });

  return shortsLikes;
};
