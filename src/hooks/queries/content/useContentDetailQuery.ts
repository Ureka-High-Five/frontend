import { useSuspenseQuery } from "@tanstack/react-query";
import { getContentDetail } from "@/apis/content/getContentDetail";

export const useContentDetailQuery = (contentId: string) => {
  const { data: content } = useSuspenseQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: () => getContentDetail(contentId),
    retry: false,
  });

  return { content };
};
