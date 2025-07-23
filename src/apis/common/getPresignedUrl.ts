import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

const getPresignedUrl = async () => {
  const response = await axiosInstance.get(END_POINTS.PRESIGNEDURL);

  return response.data.content;
};

export default getPresignedUrl;
