// src/apis/shorts/getShortsById.ts
import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ShortsItem } from "@/types/shorts";

export const getShortsById = async (shortsId: string): Promise<ShortsItem> => {
  const response = await axiosInstance.get(`${END_POINTS.SHORTS}/${shortsId}`);

  return response.data.content;
};
