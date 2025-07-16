import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { MyReview } from "@/types/content";

export const getMyReview = async (contentId: string): Promise<MyReview> => {
  const response = await axiosInstance.get(
    `/${END_POINTS.CONTENT_REVIEW}/${contentId}/me`
  );
  return response.data.content;
};
