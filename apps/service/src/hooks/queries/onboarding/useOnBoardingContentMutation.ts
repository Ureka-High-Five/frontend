import { useMutation } from "@tanstack/react-query";
import postOnBoardingContent from "@/apis/onboarding/postOnBoardingContent";

const useOnBoardingContentMutation = () => {
  const postOnBoardingContentMutation = useMutation({
    mutationFn: postOnBoardingContent,
  });

  return {
    mutatePostOnBoardingContent: postOnBoardingContentMutation.mutateAsync,
  };
};

export default useOnBoardingContentMutation;
