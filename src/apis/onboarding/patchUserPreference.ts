import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { UserData } from "@/stores/useUserStore";
import type { ExistingUserLogin } from "@/types/auth";

const patchUserPreference = async (
  userInformation: UserData
): Promise<ExistingUserLogin> => {
  const response = await axiosInstance.patch(
    END_POINTS.USER_PREFERENCE,
    {
      userId: userInformation.userId,
      selectedContentIds: userInformation.selectedContentIds,
      year: userInformation.birthYear,
      gender: userInformation.gender,
      name: userInformation.name,
    },
    {
      isAuthRequired: false,
    }
  );

  return response.data.content;
};

export default patchUserPreference;
