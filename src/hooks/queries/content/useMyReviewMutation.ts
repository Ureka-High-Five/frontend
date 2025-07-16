import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axiosInstance";

interface PostMyReviewRequest {
  contentId: string;
  rating: number;
  review?: string;
}

export const useMyReviewMutation = (contentId: string) => {
  const queryClient = useQueryClient();

  // 내 리뷰 생성/수정 (이 파일에서 직접 구현)
  return useMutation({
    mutationFn: async (body: PostMyReviewRequest) => {
      await axiosInstance.post("/content/review", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReview", contentId] });
    },
  });
};
