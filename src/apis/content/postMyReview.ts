import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { PostMyReviewRequest } from "@/types/content";

export const postMyReview = async (body: PostMyReviewRequest) => {
  await axiosInstance.post(`/${END_POINTS.CONTENT_REVIEW}`, body);
};
