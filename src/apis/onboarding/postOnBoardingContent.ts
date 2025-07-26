import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { OnBoardingContent } from "@/types/content";

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
