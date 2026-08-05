import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type {
  ShortsCommentRequest,
  CommentWithTime,
} from "@lead-me/types/shorts";

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
