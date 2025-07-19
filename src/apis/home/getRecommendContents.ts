import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { RecommendContentsResponse } from "@/types/RecommendContentsResponse";

export const getRecommendContents =
  async (): Promise<RecommendContentsResponse> => {
    const response = await axiosInstance.get(END_POINTS.HOME_RECOMMEND);

    return response.data.content;
  };
