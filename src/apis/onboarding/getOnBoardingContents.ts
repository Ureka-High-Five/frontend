import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { OnBoardingContent } from "@/types/content";

const getOnBoardingContents = async (): Promise<OnBoardingContent[]> => {
  const response = await axiosInstance.get(END_POINTS.INIT_ONBOARDING, {
    isAuthRequired: false,
  });

  return response.data.content;
};

export default getOnBoardingContents;
