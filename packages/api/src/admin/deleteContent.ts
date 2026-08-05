import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

const deleteContent = async (contentId: number) => {
  const response = await axiosInstance.delete(
    `${END_POINTS.CONTENT}/${contentId}`
  );

  return response.data.content;
};

export default deleteContent;
