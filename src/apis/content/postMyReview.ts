import { axiosInstance } from "@/apis/axiosInstance";

interface PostMyReviewRequest {
  contentId: number;
  rating: number;
  review?: string;
}

export const postMyReview = async (body: PostMyReviewRequest) => {
  await axiosInstance.post("/content/review", body);
};
