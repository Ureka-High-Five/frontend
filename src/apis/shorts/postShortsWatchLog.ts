import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { WatchLogRequest } from "@/types/shorts";

export const postShortsWatchLog = async ({
  id,
  watchTime,
  type,
}: WatchLogRequest) => {
  await axiosInstance.post(`/${END_POINTS.WATCH_LOG}`, {
    id,
    watchTime,
    type,
  });
};
