import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

interface CurationPresignedUrlResponse {
  presignedUrl: string;
  imageUrl: string;
}

const getCurationPresignedUrl =
  async (): Promise<CurationPresignedUrlResponse> => {
    const response = await axiosInstance.get(END_POINTS.PRESIGNEDURL_CURATION);

    return response.data.content;
  };

export default getCurationPresignedUrl;
