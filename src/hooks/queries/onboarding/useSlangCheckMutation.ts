import { useMutation } from "@tanstack/react-query";
import postSlangCheck from "@/apis/onboarding/postSlangCheck";

const useSlangCheckMutation = () => {
  const { mutateAsync: mutateSlangCheck } = useMutation({
    mutationFn: postSlangCheck,
  });

  return {
    mutateSlangCheck,
  };
};

export default useSlangCheckMutation;
