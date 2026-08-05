import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { RecommendContentsResponse } from "@lead-me/types/RecommendContentsResponse";

export const getRecommendContents =
  async (): Promise<RecommendContentsResponse> => {
    const response = await axiosInstance.get(END_POINTS.HOME_RECOMMEND);

    return response.data.content;
  };
