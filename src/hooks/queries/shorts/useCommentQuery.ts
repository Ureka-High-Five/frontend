import { useQuery } from "@tanstack/react-query";
import { getShortsComment } from "@/apis/shorts/getShortsComment";
import type { ShortsTimeLine } from "@/types/shorts";

export const useCommentQuery = ({ shortsId, time }: ShortsTimeLine) => {
  const { data: shortsComment } = useQuery({
    queryKey: ["shortsComment", shortsId, time],
    queryFn: () => getShortsComment(shortsId, String(time)),
    enabled: !!shortsId && !!time,
  });

  return shortsComment;
};
