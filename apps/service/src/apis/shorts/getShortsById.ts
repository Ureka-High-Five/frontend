import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { ShortsItem } from "@lead-me/types/shorts";

export const getShortsById = async (shortsId: string): Promise<ShortsItem> => {
  const response = await axiosInstance.get(`${END_POINTS.SHORTS}/${shortsId}`);

  return response.data.content;
};
