import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { PostMyReviewRequest } from "@lead-me/types/content";

export const postMyReview = async (body: PostMyReviewRequest) => {
  await axiosInstance.post(`/${END_POINTS.CONTENT_REVIEW}`, body);
};
