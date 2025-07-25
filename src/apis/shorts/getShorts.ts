import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { GetShortsResponse } from "@/types/shorts";

interface GetShortsParams {
  cursor?: number;
  size?: number;
}

export const getShorts = async ({
  cursor,
  size = 5,
}: GetShortsParams): Promise<GetShortsResponse> => {
  const response = await axiosInstance.get(END_POINTS.SHORTS, {
    params: { cursor, size },
  });

  return response.data.content;
};
