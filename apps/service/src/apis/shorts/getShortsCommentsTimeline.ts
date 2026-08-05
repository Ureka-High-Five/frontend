import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { CommentWithTime } from "@lead-me/types/shorts";

interface GetShortsCommentsTimelineParams {
  shortsId: number;
  time: number;
  duration?: number;
}

export const getShortsCommentsTimeline = async ({
  shortsId,
  time,
  duration = 10,
}: GetShortsCommentsTimelineParams): Promise<CommentWithTime[]> => {
  const response = await axiosInstance.get(
    `${END_POINTS.SHORTS_COMMENT_TIMELINE(shortsId)}`,
    {
      params: { time, duration },
    }
  );

  return response.data.content;
};
