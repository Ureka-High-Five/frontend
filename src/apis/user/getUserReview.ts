import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { UserReviewListResponse } from "@/types/user";

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
