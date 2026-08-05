import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { GetSearchContentsResponse } from "@lead-me/types/search";

interface GetSearchContentsParams {
  input: string;
  cursor?: number;
  size?: number;
}

export const getSearchContents = async ({
  input,
  cursor,
  size = 10,
}: GetSearchContentsParams): Promise<GetSearchContentsResponse> => {
  const response = await axiosInstance.get(END_POINTS.CONTENT_SEARCH, {
    params: { input, cursor, size },
    isAuthRequired: false,
  });

  return response.data.content;
};
