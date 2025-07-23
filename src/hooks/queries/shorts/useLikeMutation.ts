import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsLike } from "@/apis/shorts/postShortsLike";
import type {
  ShortsTimeLine,
  ShortsLikeContent,
  LikeTimeline,
} from "@/types/shorts";

export const useLikeMutation = ({ shortsId, time }: ShortsTimeLine) => {
  const queryClient = useQueryClient();

  const { mutate: mutatePostShortsLike, isPending: isPosting } = useMutation({
    mutationFn: () => postShortsLike({ shortsId, time }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["shortsLike", shortsId] });

      const previousData = queryClient.getQueryData<ShortsLikeContent>([
        "shortsLike",
        shortsId,
      ]);

      if (!previousData) return { previousData };

      const updatedTimelines: LikeTimeline[] = previousData.likeTimeLines.map(
        (entry) =>
          entry.time === time
            ? { ...entry, count: (entry.count ?? 0) + 1 }
            : entry
      );

      queryClient.setQueryData<ShortsLikeContent>(["shortsLike", shortsId], {
        ...previousData,
        likeTimeLines: updatedTimelines,
      });

      return { previousData };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["shortsLike", shortsId],
          context.previousData
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shortsLike", shortsId] });
    },
  });

  return {
    mutatePostShortsLike,
    isPosting,
  };
};
