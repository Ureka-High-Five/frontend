import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { PreviewVideo } from '@/types/content';

export const getPreviewVideo = async (contentId: number) => {
  const { data } = await axiosInstance.get<PreviewVideo>(
    END_POINTS.PREVIEW_VIDEO(contentId)
  );
  
  return data.content;
};
