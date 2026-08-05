import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

const deleteUserReview = async (reviewId: number) => {
  const response = await axiosInstance.delete(
    `${END_POINTS.CONTENT_REVIEW}/${reviewId}`
  );

  return response.data.content;
};

export default deleteUserReview;
