import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { CommentWithTime } from "@/types/shorts";

interface GetShortsCommentsTimelineParams {
  shortsId: string;
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
