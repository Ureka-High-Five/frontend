import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteUserReview from "@/apis/my/review/deleteUserReview";
import { makeToast } from "@/utils/makeToast";

const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteMyReview } = useMutation({
    mutationFn: deleteUserReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReview"] });

      makeToast("리뷰 삭제 성공", "success");
    },
  });

  return {
    mutateDeleteMyReview,
  };
};

export default useDeleteReviewMutation;
