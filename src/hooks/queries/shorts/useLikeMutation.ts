import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShortsLike } from "@/apis/shorts/postShortsLike";
import type {
  ShortsTimeLine,
  ShortsLikeContent,
  LikeTimeline,
  // ShortsItem,
  // GetShortsResponse,
} from "@/types/shorts";
// import type { InfiniteData } from "@tanstack/react-query";

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

      // const previousShortsList = queryClient.getQueryData<
      //   InfiniteData<GetShortsResponse>
      // >(["shorts"]);

      // const previousShortById = queryClient.getQueryData<ShortsItem>([
      //   "shortsById",
      //   shortsId,
      // ]);

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
        });
      }

      // if (previousShortsList) {
      //   queryClient.setQueryData<InfiniteData<GetShortsResponse>>(["shorts"], {
      //     ...previousShortsList,
      //     pages: previousShortsList.pages.map((page) => ({
      //       ...page,
      //       items: page.items.map((item) =>
      //         item.shortsId === Number(shortsId)
      //           ? { ...item, liked: true }
      //           : item
      //       ),
      //     })),
      //   });
      // }

      // if (previousShortById) {
      //   queryClient.setQueryData<ShortsItem>(["shortsById", shortsId], {
      //     ...previousShortById,
      //     liked: true,
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
  });

  return {
    mutatePostShortsLike,
    isPosting,
  };
};
