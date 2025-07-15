import { useQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/apis/content/getContentDetail";

export const useContentDetail = (contentId: string) => {
  return useQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => getContentDetail(contentId),
    enabled: !!contentId,
  });
};
