import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { Content } from "@lead-me/types/content";

export const getContentDetail = async (contentId: string): Promise<Content> => {
  const response = await axiosInstance.get(
    `/${END_POINTS.CONTENT}/${contentId}/detail`
  );

  return response.data.content;
};
