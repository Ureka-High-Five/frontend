import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ShortsTimeLine } from "@/types/shorts";

export const postShortsLike = async ({ shortsId, time }: ShortsTimeLine) => {
  await axiosInstance.post(`/${END_POINTS.SHORTS_LIKE}`, { shortsId, time });
};
