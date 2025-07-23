import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsDislike } from "@/apis/shorts/postShortsDislike";
import type { ShortsLikeContent, LikeTimeline } from "@/types/shorts";

export const useDislikeMutation = (shortsId: string) => {
  const queryClient = useQueryClient();

  const { mutate: mutatePostShortsDislike, isPending: isPosting } = useMutation(
    {
      mutationFn: () => postShortsDislike(shortsId),

      // 낙관적 업데이트
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ["shortsLike", shortsId] });

        const previousData = queryClient.getQueryData<ShortsLikeContent>([
          "shortsLike",
          shortsId,
        ]);

        if (!previousData) return { previousData };

        // 좋아요 count 전체 1 감소
        const updatedTimelines: LikeTimeline[] = previousData.likeTimeLines.map(
          (entry) => ({
            ...entry,
            count: Math.max((entry.count ?? 1) - 1, 0),
          })
        );

        queryClient.setQueryData<ShortsLikeContent>(["shortsLike", shortsId], {
          ...previousData,
          likeTimeLines: updatedTimelines,
        });

        return { previousData };
      },

      // 실패 시 롤백
      onError: (_err, _vars, context) => {
        if (context?.previousData) {
          queryClient.setQueryData(
            ["shortsLike", shortsId],
            context.previousData
          );
        }
      },

      // 항상 최신 데이터 fetch
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
