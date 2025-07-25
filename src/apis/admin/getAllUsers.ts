import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { GetUsersResponse } from "@/types/admin";

interface GetAllUsersParams {
  cursor?: number;
  size?: number;
}

export const getAllUsers = async ({
  cursor,
  size = 10,
}: GetAllUsersParams): Promise<GetUsersResponse> => {
  const response = await axiosInstance.get(END_POINTS.USER, {
    params: { cursor, size },
  });

  return response.data.content;
};
