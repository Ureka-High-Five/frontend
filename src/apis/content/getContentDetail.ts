import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { Content } from "@/types/content";

export const getContentDetail = async (contentId: string): Promise<Content> => {
  const response = await axiosInstance.get(
    `/${END_POINTS.CONTENT}/${contentId}/detail`
  );

  return response.data.content;
};
