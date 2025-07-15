import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axiosInstance";
import { getMyReview } from "@/apis/content/getMyReview";
import type { MyReview } from "@/types/content";

interface PostMyReviewRequest {
  contentId: string;
  rating: number;
  review?: string;
}

export const useMyReview = (contentId: string) => {
  const queryClient = useQueryClient();

  // 내 리뷰 조회
  const query = useQuery<MyReview>({
    queryKey: ["myReview", contentId],
    queryFn: () => getMyReview(contentId),
    enabled: !!contentId,
  });

  // 내 리뷰 생성/수정 (이 파일에서 직접 구현)
  const mutation = useMutation({
    mutationFn: async (body: PostMyReviewRequest) => {
      await axiosInstance.post("/content/review", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReview", contentId] });
    },
  });

  return {
    ...query,
    postMyReview: mutation.mutate,
    isPosting: mutation.isPending,
  };
};
