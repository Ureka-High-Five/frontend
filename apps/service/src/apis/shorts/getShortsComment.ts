import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { Comment } from "@lead-me/types/shorts";

export const getShortsComment = async (
  shortsId: number,
  time: number
): Promise<Comment> => {
  const response = await axiosInstance.get(`/${END_POINTS.SHORTS_COMMENT}`, {
    params: {
      shortsId,
      time,
    },
  });

  return response.data.content;
};
