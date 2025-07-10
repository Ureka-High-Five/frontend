import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { KakaoLogin } from "@/types/auth";

const postKakaoLogin = async (code: string): Promise<KakaoLogin> => {
  const response = await axiosInstance.post(
    `${END_POINTS.KAKAOLOGIN}`,
    {
      code,
    },
    {
      isAuthRequired: false,
    }
  );

  return response.data.content;
};

export default postKakaoLogin;
