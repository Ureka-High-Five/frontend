import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { UserInformation } from "@/types/user";

const getUserInformation = async (): Promise<UserInformation> => {
  const response = await axiosInstance.get(END_POINTS.USER_INFORMATION);

  return response.data.content;
};

export default getUserInformation;
