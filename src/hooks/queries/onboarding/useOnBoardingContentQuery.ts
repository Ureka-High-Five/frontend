import { useQuery } from "@tanstack/react-query";
import getOnBoardingContents from "@/apis/onboarding/getOnBoardingContents";
import type { OnBoardingContent } from "@/types/content";

const useOnBoardingContentQuery = () => {
  const { data: onBoardingContent } = useQuery<OnBoardingContent[]>({
    queryKey: ["onBoardingContent"],
    queryFn: () => getOnBoardingContents(),
    gcTime: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });

  return { onBoardingContent };
};

export default useOnBoardingContentQuery;
