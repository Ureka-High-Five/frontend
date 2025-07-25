import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

export const postShortsDislike = async (shortsId: number) => {
  await axiosInstance.post(`/${END_POINTS.SHORTS_DISLIKE}`, { shortsId });
};
