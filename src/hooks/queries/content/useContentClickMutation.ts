import { useMutation } from "@tanstack/react-query";
import postContentClick from "@/apis/content/postContentClick";

const useContentClickMutation = () => {
  const postContentClickMutation = useMutation({
    mutationFn: postContentClick,
  });

  return {
    mutatePostContentClick: postContentClickMutation.mutateAsync,
  };
};

export default useContentClickMutation;
