import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { ShortsTimeLine } from "@lead-me/types/shorts";

export const postShortsLike = async ({ shortsId, time }: ShortsTimeLine) => {
  await axiosInstance.post(`/${END_POINTS.SHORTS_LIKE}`, { shortsId, time });
};
