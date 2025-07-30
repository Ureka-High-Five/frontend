import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

interface PresignedUrlResponse {
  presignedUrl: string;
  imageUrl: string;
}

const getCurationPresignedUrl = async (): Promise<PresignedUrlResponse> => {
  const response = await axiosInstance.get(END_POINTS.PRESIGNEDURL_CURATION);

  return response.data.content;
};

export default getCurationPresignedUrl;
