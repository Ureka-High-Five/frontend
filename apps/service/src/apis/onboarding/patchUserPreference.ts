import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { UserData } from "@/stores/useUserStore";
import type { ExistingUserLogin } from "@lead-me/types/auth";

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
