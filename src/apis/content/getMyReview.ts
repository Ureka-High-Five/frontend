import { axiosInstance } from "@/apis/axiosInstance";
import type { MyReview } from "@/types/content";

export const getMyReview = async (contentId: string): Promise<MyReview> => {
  const { data } = await axiosInstance.get(`/content/review/${contentId}/me`);
  console.log(data);
  return data.content;
};
