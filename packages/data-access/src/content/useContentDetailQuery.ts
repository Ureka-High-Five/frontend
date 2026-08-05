import { getContentDetail } from "@lead-me/api/getContentDetail";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useContentDetailQuery = (contentId: string) => {
  const { data: content } = useSuspenseQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => {
      if (!contentId || contentId === "0" || contentId === "") {
        return Promise.resolve(null);
      }
      return getContentDetail(contentId);
    },
    staleTime: 60 * 60 * 1000,
    retry: false,
  });

  return { content };
};
