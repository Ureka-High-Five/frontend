import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyReview } from "@/apis/content/getMyReview";

export const useMyReviewQuery = (contentId: string) => {
  const { data: myReview } = useSuspenseQuery({
    queryKey: ["myReview", contentId],
    queryFn: () => getMyReview(contentId),
  });

  return { myReview };
};
