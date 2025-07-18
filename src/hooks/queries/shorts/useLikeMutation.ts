import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsLike } from "@/apis/shorts/postShortsLike";
import type { ShortsTimeLine } from "@/types/shorts";

export const useLikeMutation = ({ shortsId, time }: ShortsTimeLine) => {
  const queryClient = useQueryClient();

  const { mutate: mutatePostShortsLike, isPending: isPosting } = useMutation({
    mutationFn: () => postShortsLike({ shortsId, time }),
    onSuccess: () => {
      console.log("like post 성공");
      queryClient.invalidateQueries({
        queryKey: ["shortsLike", shortsId, time],
      });
    },
  });

  return {
    mutatePostShortsLike,
    isPosting,
  };
};
