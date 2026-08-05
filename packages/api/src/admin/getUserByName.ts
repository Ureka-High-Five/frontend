import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { GetUsersResponse } from "@lead-me/types/admin";

interface GetAllUsersParams {
  name: string;
  cursor?: number;
  size?: number;
}

export const getUserByName = async ({
  name,
  cursor,
  size = 10,
}: GetAllUsersParams): Promise<GetUsersResponse> => {
  const response = await axiosInstance.get(
    `${END_POINTS.USER}/${encodeURIComponent(name)}`,
    {
      params: { cursor, size },
    }
  );

  return response.data.content;
};
