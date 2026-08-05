import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { MyCurationResponse } from "@lead-me/types/curation";

const getMyCuration = async (
  cursor?: string,
  size: number = 10
): Promise<MyCurationResponse> => {
  const params: { size: number; cursor?: string } = { size };
  if (cursor) params.cursor = cursor;

  const response = await axiosInstance.get(END_POINTS.MY_CURATION, {
    params,
  });

  return response.data.content;
};

export default getMyCuration;
