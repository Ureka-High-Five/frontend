import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ReviewListResponse } from "@/types/content";

export const getContentReviews = async (
  contentId: string,
  cursor?: string,
  size: number = 5
): Promise<ReviewListResponse> => {
  const params: { size: number; cursor?: string } = { size };
  if (cursor) params.cursor = cursor;

  const { data } = await axiosInstance.get(
    `/${END_POINTS.CONTENT_REVIEW}/${contentId}`,
    {
      params,
    }
  );
  return data;
};
