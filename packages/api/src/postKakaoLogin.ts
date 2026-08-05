import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { KakaoLogin } from "@lead-me/types/auth";

const postKakaoLogin = async (code: string): Promise<KakaoLogin> => {
  const response = await axiosInstance.post(
    END_POINTS.KAKAOLOGIN,
    { code },
    { isAuthRequired: false }
  );

  return response.data.content;
};

export default postKakaoLogin;
