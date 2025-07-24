import { useQuery } from "@tanstack/react-query";
import { getShortsLike } from "@/apis/shorts/getShortsLike";
import type { ShortsDuration } from "@/types/shorts";

export const useLikeQuery = ({ shortsId, duration }: ShortsDuration) => {
  const { data: shortsLikes } = useQuery({
    queryKey: ["shortsLike", shortsId, duration],
    queryFn: () => getShortsLike(shortsId, duration),
    enabled: !!shortsId && !!duration,
  });

  return shortsLikes?.likeTimeLines;
};
