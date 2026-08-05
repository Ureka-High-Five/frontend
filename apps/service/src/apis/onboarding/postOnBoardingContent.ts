import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { OnBoardingContent } from "@lead-me/types/content";

interface PostOnBoardingContentProps {
  selectedContentIds: number[];
  recommendedContentIds: number[];
}

const postOnBoardingContent = async ({
  selectedContentIds,
  recommendedContentIds,
}: PostOnBoardingContentProps): Promise<OnBoardingContent[]> => {
  const response = await axiosInstance.post(
    END_POINTS.RECOMMEND_ONBOARDING,
    {
      selectedContentIds,
      recommendedContentIds,
    },
    {
      isAuthRequired: false,
    }
  );

  return response.data.content;
};

export default postOnBoardingContent;
