import { useQuery } from "@tanstack/react-query";
import getOnBoardingContents from "@/apis/onboarding/getOnBoardingContents";
import type { OnBoardingContent } from "@lead-me/types/content";

const useOnBoardingContentQuery = () => {
  const { data: onBoardingContent } = useQuery<OnBoardingContent[]>({
    queryKey: ["onBoardingContent"],
    queryFn: () => getOnBoardingContents(),
  });

  return { onBoardingContent };
};

export default useOnBoardingContentQuery;
