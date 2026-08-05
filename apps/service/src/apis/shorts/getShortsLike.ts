import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { ShortsLikeContent } from "@lead-me/types/shorts";

export const getShortsLike = async (
  shortsId: number,
  duration: string
): Promise<ShortsLikeContent> => {
  const response = await axiosInstance.get(`/${END_POINTS.SHORTS_LIKE}`, {
    params: {
      shortsId,
      duration,
    },
  });

  return response.data.content;
};
