import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ContentCreateRequest } from "@/types/content";

export const postContent = async (body: ContentCreateRequest) => {
  await axiosInstance.post(`/${END_POINTS.CONTENT}`, body);
};
