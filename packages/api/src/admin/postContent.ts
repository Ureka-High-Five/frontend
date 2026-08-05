import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { ContentCreateRequest } from "@lead-me/types/content";

export const postContent = async (body: ContentCreateRequest) => {
  await axiosInstance.post(`/${END_POINTS.CONTENT}`, body);
};
