import { useQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/apis/content/getContentDetail";

export const useContentDetailQuery = (contentId: string) => {
  const {
    data: content,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => getContentDetail(contentId),
    enabled: !!contentId,
  });

  return { content, isLoading, error };
};
