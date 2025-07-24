import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { MyCurationResponse } from "@/types/curation";

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
