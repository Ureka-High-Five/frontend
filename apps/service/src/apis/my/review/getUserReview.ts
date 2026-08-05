import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { UserReviewListResponse } from "@lead-me/types/user";

const getUserReview = async (
  cursor?: number,
  size: number = 5
): Promise<UserReviewListResponse> => {
  const params: { size: number; cursor?: number } = { size };
  if (cursor !== undefined) params.cursor = cursor;

  const response = await axiosInstance.get(END_POINTS.USER_REVIEW, {
    params,
  });

  return response.data.content;
};

export default getUserReview;
