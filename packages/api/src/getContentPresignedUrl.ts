import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

interface ContentPresignedUrlResponse {
  imagePresignedUrl: string;
  imageUrl: string;
  shortsPresignedUrl: string;
  shortsUrl: string;
  videoPresignedUrl: string;
  videoUrl: string;
  uuid: string;
}

const getContentPresignedUrl =
  async (): Promise<ContentPresignedUrlResponse> => {
    const response = await axiosInstance.get(END_POINTS.PRESIGNEDURL_CONTENT);

    return response.data.content;
  };

export default getContentPresignedUrl;
