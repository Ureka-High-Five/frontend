import { axiosInstance } from "@/apis/axiosInstance";
import type { Content } from "@/types/content.d";

export const getContentDetail = async (contentId: string): Promise<Content> => {
  const { data } = await axiosInstance.get(`/content/${contentId}/detail`);
  return data.content;
};
