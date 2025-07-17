import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { Comment } from "@/types/shorts";

export const getShortsComment = async (
  shortsId: string,
  time: string
): Promise<Comment> => {
  const response = await axiosInstance.get(`/${END_POINTS.SHORTS_COMMENT}`, {
    params: {
      shortsId,
      time,
    },
  });

  return response.data.content;
};
