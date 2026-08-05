import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { OnBoardingContent } from "@lead-me/types/content";

const getOnBoardingContents = async (): Promise<OnBoardingContent[]> => {
  const response = await axiosInstance.get(END_POINTS.INIT_ONBOARDING, {
    isAuthRequired: false,
  });

  return response.data.content;
};

export default getOnBoardingContents;
