import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsComment } from "@/apis/shorts/postShortsComment";

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: mutatePostShortsComment, isPending: isPosting } = useMutation(
    {
      mutationFn: postShortsComment,
      onSuccess: (_, { shortsId, time }) => {
        queryClient.invalidateQueries({
          queryKey: ["shortsComment", shortsId, time],
        });
      },
    }
  );

  return {
    mutatePostShortsComment,
    isPosting,
  };
};
