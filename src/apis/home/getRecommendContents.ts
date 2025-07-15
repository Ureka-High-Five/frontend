import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { RecommendContentsResponse } from "@/types/RecommendContentsResponse";

export const getRecommendContents = async () => {
  const { data } = await axiosInstance.get<RecommendContentsResponse>(
    END_POINTS.HOME_RECOMMEND
  );
  return data.content;
};