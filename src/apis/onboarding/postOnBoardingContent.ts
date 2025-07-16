import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { OnBoardingContent } from "@/types/content";

const postOnBoardingContent = async (
  selectedContentIds: number[]
): Promise<OnBoardingContent[]> => {
  const response = await axiosInstance.post(
    END_POINTS.RECOMMEND_ONBOARDING,
    {
      selectedContentIds,
    },
    {
      isAuthRequired: false,
    }
  );

  return response.data.content;
};

export default postOnBoardingContent;
