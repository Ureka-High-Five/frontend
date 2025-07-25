import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsDislike } from "@/apis/shorts/postShortsDislike";
import type { ShortsLikeContent, LikeTimeline } from "@/types/shorts";

export const useDislikeMutation = ({
  shortsId,
  time,
}: {
  shortsId: string;
  time: number;
}) => {
  const queryClient = useQueryClient();

  const { mutate: mutatePostShortsDislike, isPending: isPosting } = useMutation(
    {
      mutationFn: () => postShortsDislike(shortsId),

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
                ? { ...entry, count: Math.max((entry.count ?? 0) - 1, 0) }
                : entry
            );

          queryClient.setQueryData<ShortsLikeContent>(
            ["shortsLike", shortsId],
            {
              ...previousLikeData,
              likeTimeLines: updatedTimelines,
            }
          );
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
    }
  );

  return {
    mutatePostShortsDislike,
    isPosting,
  };
};
