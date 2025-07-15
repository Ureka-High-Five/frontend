import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { Content } from "@/types/content";

export const getContentDetail = async (contentId: string): Promise<Content> => {
  const { data } = await axiosInstance.get(
    `/${END_POINTS.CONTENT}/${contentId}/detail`
  );
  return data.content;
};
