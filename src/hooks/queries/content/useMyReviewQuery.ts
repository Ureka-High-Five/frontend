import { useQuery } from "@tanstack/react-query";
import { getMyReview } from "@/apis/content/getMyReview";
import type { MyReview } from "@/types/content";

export const useMyReviewQuery = (contentId: string) => {
  const { data: myReview } = useQuery<MyReview>({
    queryKey: ["myReview", contentId],
    queryFn: () => getMyReview(contentId),
    enabled: !!contentId,
  });

  return myReview;
};
