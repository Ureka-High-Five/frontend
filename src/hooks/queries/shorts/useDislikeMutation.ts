import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsDislike } from "@/apis/shorts/postShortsDislike";

export const useDislikeMutation = (shortsId: string) => {
  const queryClient = useQueryClient();

  const { mutate: mutatePostShortsDislike, isPending: isPosting } = useMutation(
    {
      mutationFn: () => postShortsDislike(shortsId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["shortsLike", shortsId],
        });
      },
    }
  );

  return {
    mutatePostShortsDislike,
    isPosting,
  };
};
