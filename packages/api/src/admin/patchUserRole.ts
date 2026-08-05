import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { UserRole } from "@lead-me/types/admin";
import type { ExistingUserLogin } from "@lead-me/types/auth";

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
