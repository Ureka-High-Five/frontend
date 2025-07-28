import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import deleteUserReview from "@/apis/my/review/deleteUserReview";
import { makeToast } from "@/utils/makeToast";
import type { UserReviewListResponse } from "@/types/user";

const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteMyReview } = useMutation({
    mutationFn: deleteUserReview,

    onMutate: async (reviewId: number) => {
      await queryClient.cancelQueries({ queryKey: ["userReview"] });

      const previousReviewData = queryClient.getQueryData<
        InfiniteData<UserReviewListResponse>
      >(["userReview"]);

      queryClient.setQueryData<InfiniteData<UserReviewListResponse>>(
        ["userReview"],
        (currentReviewData) => {
          if (!currentReviewData) return currentReviewData;

          return {
            ...currentReviewData,
            pages: currentReviewData.pages.map((page) => ({
              ...page,
              items: page.items.filter((review) => review.id !== reviewId),
            })),
          };
        }
      );

      return { previousReviewData };
    },

    onError: (_error, _reviewId, context) => {
      if (context?.previousReviewData) {
        queryClient.setQueryData(["userReview"], context.previousReviewData);
      }

      makeToast("리뷰 삭제 실패", "warning");
    },

    onSuccess: () => {
      makeToast("리뷰 삭제 성공", "success");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userReview"] });
    },
  });

  return {
    mutateDeleteMyReview,
  };
};

export default useDeleteReviewMutation;
