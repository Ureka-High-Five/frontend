import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS, REFRESH_TOKEN } from "@/constants/api";
import type { NewToken } from "@/types/auth";

const postNewToken = async (): Promise<NewToken> => {
  const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);

  const response = await axiosInstance.post(
    END_POINTS.NEWTOKEN,
    { refreshToken },
    {
      authRequired: false,
    }
  );

  return response.data.content;
};

export default postNewToken;
