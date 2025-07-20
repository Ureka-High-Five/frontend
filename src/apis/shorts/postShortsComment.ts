import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ShortsCommentRequest } from "@/types/shorts";

export const postShortsComment = async ({
  shortsId,
  time,
  comment,
}: ShortsCommentRequest) => {
  await axiosInstance.post(`/${END_POINTS.SHORTS_COMMENT}`, {
    shortsId,
    time,
    comment,
  });
};
