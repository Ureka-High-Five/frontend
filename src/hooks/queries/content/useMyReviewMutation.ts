import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMyReview } from "@/apis/content/postMyReview";
import { makeToast } from "@/utils/makeToast";
import type { PostMyReviewRequest } from "@/types/content";

export const useMyReviewMutation = (contentId: string) => {
  const queryClient = useQueryClient();

  // 내 리뷰 생성/수정 (이 파일에서 직접 구현)
  const { mutate: mutatePostReview, isPending: isPosting } = useMutation({
    mutationFn: (body: PostMyReviewRequest) => postMyReview(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReview", contentId] });
      makeToast("리뷰 작성 성공", "success");
    },
  });

  return {
    mutatePostReview,
    isPosting,
  };
};
