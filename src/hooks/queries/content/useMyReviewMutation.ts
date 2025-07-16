import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMyReview } from "@/apis/content/postMyReview";
import type { PostMyReviewRequest } from "@/types/content";

export const useMyReviewMutation = (contentId: string) => {
  const queryClient = useQueryClient();

  // 내 리뷰 생성/수정 (이 파일에서 직접 구현)
  return useMutation({
    mutationFn: async (body: PostMyReviewRequest) => {
      await postMyReview(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReview", contentId] });
    },
  });
};
