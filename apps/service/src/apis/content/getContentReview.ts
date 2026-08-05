import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { ReviewListResponse } from "@lead-me/types/content";

export const getContentReviews = async (
  contentId: string,
  cursor?: string,
  size: number = 5
): Promise<ReviewListResponse> => {
  const params: { size: number; cursor?: string } = { size };
  if (cursor) params.cursor = cursor;

  const response = await axiosInstance.get(
    `/${END_POINTS.CONTENT_REVIEW}/${contentId}`,
    {
      params,
    }
  );
  return response.data.content;
};
