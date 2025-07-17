import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsComment } from "@/apis/shorts/postShortsComment";
import type { PostCommentRequest } from "@/types/shorts";

export const useCommentQuery = ({
  shortsId,
  time,
  comment,
}: PostCommentRequest) => {
  const queryClient = useQueryClient();

  const { mutate: mutatePostShortsComment, isPending: isPosting } = useMutation(
    {
      mutationFn: () => postShortsComment({ shortsId, time, comment }),
      onSuccess: () => {
        console.log("comment post 성공");
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
