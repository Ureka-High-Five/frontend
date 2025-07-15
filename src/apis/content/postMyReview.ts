import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

interface PostMyReviewRequest {
  contentId: number;
  rating: number;
  review?: string;
}

export const postMyReview = async (body: PostMyReviewRequest) => {
  await axiosInstance.post(`/${END_POINTS.CONTENT_REVIEW}`, body);
};
