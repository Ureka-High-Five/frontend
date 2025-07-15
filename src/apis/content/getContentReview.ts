import { axiosInstance } from "@/apis/axiosInstance";
import type { ReviewListResponse } from "@/types/content";

export const getContentReviews = async (
  contentId: string,
  cursor?: string,
  size: number = 5
): Promise<ReviewListResponse> => {
  const params: { size: number; cursor?: string } = { size };
  if (cursor) params.cursor = cursor;

  const { data } = await axiosInstance.get(`/content/review/${contentId}`, {
    params,
  });
  return data;
};
