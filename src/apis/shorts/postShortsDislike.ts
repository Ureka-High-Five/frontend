import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

export const postShortsDislike = async (shortsId: string) => {
  await axiosInstance.post(`/${END_POINTS.SHORTS_LIKE}`, { shortsId });
};
