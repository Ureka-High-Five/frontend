import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { GetShortsResponse } from "@lead-me/types/shorts";

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
