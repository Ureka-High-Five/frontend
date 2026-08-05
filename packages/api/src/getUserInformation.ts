import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { UserInformation } from "@lead-me/types/user";

const getUserInformation = async (): Promise<UserInformation> => {
  const response = await axiosInstance.get(END_POINTS.USER_INFORMATION);

  return response.data.content;
};

export default getUserInformation;
