import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { PreviewVideo } from "@lead-me/types/content";

export const getPreviewVideo = async (
  contentId: number
): Promise<PreviewVideo> => {
  const response = await axiosInstance.get(END_POINTS.PREVIEW_VIDEO(contentId));

  return response.data.content;
};
