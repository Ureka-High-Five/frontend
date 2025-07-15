import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';

export interface PreviewVideoResponse {
  videoUrl: string;
  type: string;
}

export const getPreviewVideo = async (contentId: number) => {
  const { data } = await axiosInstance.get<PreviewVideoResponse>(
    END_POINTS.CONTENT.PREVIEW_VIDEO(contentId)
  );
  return data.content;
};
