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

      const previousLikeData = queryClient.getQueryData<ShortsLikeContent>([
        "shortsLike",
        shortsId,
      ]);

      if (previousLikeData) {
        const updatedTimelines: LikeTimeline[] =
          previousLikeData.likeTimeLines.map((entry) =>
            entry.time === time
              ? { ...entry, count: (entry.count ?? 0) + 1 }
              : entry
          );

        queryClient.setQueryData<ShortsLikeContent>(["shortsLike", shortsId], {
          ...previousLikeData,
          likeTimeLines: updatedTimelines,
          liked: true,
        });
      }

      return {
        previousLikeData,
      };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousLikeData) {
        queryClient.setQueryData(
          ["shortsLike", shortsId],
          ctx.previousLikeData
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
