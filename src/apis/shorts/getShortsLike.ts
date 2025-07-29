import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ShortsLikeContent } from "@/types/shorts";

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
