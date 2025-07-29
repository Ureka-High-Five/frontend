import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

const deleteContent = async (contentId: number) => {
  const response = await axiosInstance.delete(
    `${END_POINTS.CONTENT}/${contentId}`
  );

  return response.data.content;
};

export default deleteContent;
