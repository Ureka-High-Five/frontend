import { useQuery } from "@tanstack/react-query";
import { getShortsCommentsTimeline } from "@/apis/shorts/getShortsCommentsTimeline";
import { groupCommentsByTime } from "@/utils/groupCommentsByTime";
import type { CommentWithTime } from "@/types/shorts";

const CHUNK_SIZE = 10;

interface useCommentTimelineQueryParams {
  shortsId: number;
  currentTime: number;
  enabled?: boolean;
}

export const useCommentTimelineQuery = ({
  shortsId,
  currentTime,
  enabled = true,
}: useCommentTimelineQueryParams) => {
  const chunkStart = Math.max(
    1,
    Math.floor(currentTime / CHUNK_SIZE) * CHUNK_SIZE
  );

  const { data: fetchedComments = [] } = useQuery<CommentWithTime[]>({
    queryKey: ["shortsCommentTimeline", shortsId, chunkStart],
    queryFn: () =>
      getShortsCommentsTimeline({
        shortsId,
        time: chunkStart,
        duration: CHUNK_SIZE,
      }),
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
    placeholderData: (previousData) => previousData, // 이전 데이터를 placeholder로 사용
    enabled,
  });

  const commentTimelineMap = groupCommentsByTime(fetchedComments);

  return { commentTimelineMap };
};
