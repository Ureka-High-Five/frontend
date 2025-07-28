import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

const deleteUserReview = async (reviewId: number) => {
  const response = await axiosInstance.delete(
    `${END_POINTS.CONTENT_REVIEW}/${reviewId}`
  );

  return response.data.content;
};

export default deleteUserReview;
