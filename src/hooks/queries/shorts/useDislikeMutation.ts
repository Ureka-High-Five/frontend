import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsDislike } from "@/apis/shorts/postShortsDislike";
import type {
  ShortsLikeContent,
  LikeTimeline,
  // ShortsItem,
  // GetShortsResponse,
} from "@/types/shorts";
// import type { InfiniteData } from "@tanstack/react-query";

export const useDislikeMutation = (shortsId: string) => {
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

        // const previousShortsList = queryClient.getQueryData<
        //   InfiniteData<GetShortsResponse>
        // >(["shorts"]);

        // const previousShortById = queryClient.getQueryData<ShortsItem>([
        //   "shortsById",
        //   shortsId,
        // ]);

        if (previousLikeData) {
          const updatedTimelines: LikeTimeline[] =
            previousLikeData.likeTimeLines.map((entry) => ({
              ...entry,
              count: Math.max((entry.count ?? 1) - 1, 0),
            }));

          queryClient.setQueryData<ShortsLikeContent>(
            ["shortsLike", shortsId],
            {
              ...previousLikeData,
              likeTimeLines: updatedTimelines,
            }
          );
        }

        // if (previousShortsList) {
        //   queryClient.setQueryData<InfiniteData<GetShortsResponse>>(
        //     ["shorts"],
        //     {
        //       ...previousShortsList,
        //       pages: previousShortsList.pages.map((page) => ({
        //         ...page,
        //         items: page.items.map((item) =>
        //           item.shortsId === Number(shortsId)
        //             ? { ...item, liked: false }
        //             : item
        //         ),
        //       })),
        //     }
        //   );
        // }

        // if (previousShortById) {
        //   queryClient.setQueryData<ShortsItem>(["shortsById", shortsId], {
        //     ...previousShortById,
        //     liked: false,
        //   });
        // }

        return {
          previousLikeData,
          // previousShortsList,
          // previousShortById,
        };
      },

      onError: (_err, _vars, ctx) => {
        if (ctx?.previousLikeData) {
          queryClient.setQueryData(
            ["shortsLike", shortsId],
            ctx.previousLikeData
          );
        }

        // if (ctx?.previousShortsList) {
        //   queryClient.setQueryData(["shorts"], ctx.previousShortsList);
        // }

        // if (ctx?.previousShortById) {
        //   queryClient.setQueryData(
        //     ["shortsById", shortsId],
        //     ctx.previousShortById
        //   );
        // }
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["shortsLike", shortsId] });
        // queryClient.invalidateQueries({ queryKey: ["shortsById", shortsId] });
        // queryClient.invalidateQueries({ queryKey: ["shorts"] });
      },
    }
  );

  return {
    mutatePostShortsDislike,
    isPosting,
  };
};
