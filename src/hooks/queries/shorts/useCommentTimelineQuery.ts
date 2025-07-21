import { useQuery } from "@tanstack/react-query";
import { getShortsCommentsTimeline } from "@/apis/shorts/getShortsCommentsTimeline";
import type { CommentWithTime } from "@/types/shorts";

const CHUNK_SIZE = 10;

interface useCommentTimelineQueryParams {
  shortsId: string;
  currentTime: number;
}

export const useCommentTimelineQuery = ({
  shortsId,
  currentTime,
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
    staleTime: 1000 * 60 * 5,
  });

  const commentTimelineMap: Record<number, CommentWithTime[]> = {};
  fetchedComments.forEach((comment) => {
    if (!commentTimelineMap[comment.time]) {
      commentTimelineMap[comment.time] = [];
    }
    commentTimelineMap[comment.time].push(comment);
  });

  return { commentTimelineMap };
};
