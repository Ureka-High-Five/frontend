import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { PreviewVideo } from '@/types/content';

export const getPreviewVideo = async (contentId: number): Promise<PreviewVideo> => {
  const response = await axiosInstance.get(
    END_POINTS.PREVIEW_VIDEO(contentId)
  );
  
  return response.data.content;
};
