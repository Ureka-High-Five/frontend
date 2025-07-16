import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS, REFRESH_TOKEN } from "@/constants/api";
import type { AccessToken } from "@/types/auth";

const postNewToken = async (): Promise<AccessToken> => {
  const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);

  const response = await axiosInstance.post(
    END_POINTS.NEWTOKEN,
    { refreshToken },
    {
      isAuthRequired: false,
    }
  );

  return response.data.content;
};

export default postNewToken;
