import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ShortsCommentRequest, CommentWithTime } from "@/types/shorts";

export const postShortsComment = async ({
  shortsId,
  time,
  comment,
}: ShortsCommentRequest): Promise<CommentWithTime> => {
  const response = await axiosInstance.post(`/${END_POINTS.SHORTS_COMMENT}`, {
    shortsId,
    time,
    comment,
  });

  return response.data.content;
};
