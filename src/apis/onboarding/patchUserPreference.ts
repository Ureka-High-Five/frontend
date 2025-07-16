import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { UserData } from "@/stores/useUserStore";
import type { ExistingUserLogin } from "@/types/auth";

const patchUserPreference = async (
  userInformation: UserData
): Promise<ExistingUserLogin> => {
  const response = await axiosInstance.patch(
    END_POINTS.USER_PREFERENCE,
    userInformation,
    {
      isAuthRequired: false,
    }
  );

  return response.data.content;
};

export default patchUserPreference;
