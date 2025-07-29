import { useSuspenseQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/apis/content/getContentDetail";

export const useContentDetailQuery = (contentId: string) => {
  const { data: content } = useSuspenseQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => {
      if (!contentId || contentId === "0" || contentId === "") {
        return Promise.resolve(null);
      }
      return getContentDetail(contentId);
    },
    retry: false,
  });

  return { content };
};
