import { useQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/apis/content/getContentDetail";

export const useContentDetailQuery = (contentId?: number) => {
  const {
    data: content,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => getContentDetail(String(contentId)),
    enabled: !!contentId,
  });

  return { content, isLoading, error };
};
