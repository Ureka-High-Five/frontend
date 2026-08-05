import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

export const postShortsDislike = async (shortsId: number) => {
  await axiosInstance.post(`/${END_POINTS.SHORTS_DISLIKE}`, { shortsId });
};
