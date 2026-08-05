import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { WatchLogRequest } from "@lead-me/types/shorts";

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
