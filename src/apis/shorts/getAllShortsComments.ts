import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { GetAllCommentsResponse } from "@/types/shorts";

interface GetCommentsParams {
  shortsId: string;
  cursor?: number;
  size?: number;
}

export const getAllShortsComments = async ({
  shortsId,
  cursor,
  size = 5,
}: GetCommentsParams): Promise<GetAllCommentsResponse> => {
  const response = await axiosInstance.get(
    `${END_POINTS.SHORTS_COMMENT_TIMELINE(shortsId)}/id`,
    {
      params: { cursor, size },
    }
  );

  return response.data.content;
};
