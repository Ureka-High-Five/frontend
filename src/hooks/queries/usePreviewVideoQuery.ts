import { useQuery } from '@tanstack/react-query';
import { getPreviewVideo } from '@/apis/home/getPreviewVideo';

export const usePreviewVideoQuery = (
  contentId: number,
  enabled: boolean = false
) => {
  return useQuery({
    queryKey: ['previewVideo', contentId],
    queryFn: () => getPreviewVideo(contentId),
    enabled,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
