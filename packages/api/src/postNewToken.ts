import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS, REFRESH_TOKEN } from "@lead-me/api/constants";
import type { AccessToken } from "@lead-me/types/auth";

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
