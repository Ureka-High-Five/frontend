import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { GetSearchContentsResponse } from '@/types/search';

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
  const response = await axiosInstance.get(END_POINTS.SEARCH_CONTENT, {
    params: { input, cursor, size },
    isAuthRequired: false,
  });

  const { items, nextCursor, hasNext } = response.data.content;

  return {
    contents: items,          
    nextCursor: nextCursor ? Number(nextCursor) : null,
    hasNext,
  };
};
