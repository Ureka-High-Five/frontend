import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

interface PresignedUrlResponse {
  presignedUrl: string;
  imageUrl: string;
}

const getPresignedUrl = async (type: string): Promise<PresignedUrlResponse> => {
  const response = await axiosInstance.get(
    `${END_POINTS.PRESIGNEDURL}/${type}`
  );

  return response.data.content;
};

export default getPresignedUrl;
