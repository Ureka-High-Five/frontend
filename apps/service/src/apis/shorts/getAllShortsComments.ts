import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { GetAllCommentsResponse } from "@lead-me/types/shorts";

interface GetCommentsParams {
  shortsId: number;
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
