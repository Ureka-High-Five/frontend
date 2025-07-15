import { useQuery } from "@tanstack/react-query";
import { getPreviewVideo } from "@/apis/home/getPreviewVideo";
import type { PreviewVideo } from "@/types/content";

export const usePreviewVideoQuery = (contentId: number) => {
  const { data: previewVideo } = useQuery<PreviewVideo>({
    queryKey: ["previewVideo", contentId],
    queryFn: () => getPreviewVideo(contentId),
    enabled: !!contentId,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { previewVideo };
};
