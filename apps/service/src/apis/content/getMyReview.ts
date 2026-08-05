import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { MyReview } from "@lead-me/types/content";

export const getMyReview = async (contentId: string): Promise<MyReview> => {
  const response = await axiosInstance.get(
    `/${END_POINTS.CONTENT_REVIEW}/${contentId}/me`
  );

  return response.data.content;
};
