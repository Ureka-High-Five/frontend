import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { UserRole } from "@/types/admin";
import type { ExistingUserLogin } from "@/types/auth";

const patchUserRole = async (
  userInformation: UserRole
): Promise<ExistingUserLogin> => {
  const response = await axiosInstance.patch(
    END_POINTS.USER_ROLE,
    userInformation,
    {
      isAuthRequired: true,
    }
  );

  return response.data.content;
};

export default patchUserRole;
