import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

interface ContentPresignedUrlResponse {
  imagePresignedUrl: string;
  imageUrl: string;
  shortsPresignedUrl: string;
  shortsUrl: string;
  videoPresignedUrl: string;
  videoUrl: string;
}

const getContentPresignedUrl =
  async (): Promise<ContentPresignedUrlResponse> => {
    const response = await axiosInstance.get(END_POINTS.PRESIGNEDURL_CONTENT);

    return response.data.content;
  };

export default getContentPresignedUrl;
