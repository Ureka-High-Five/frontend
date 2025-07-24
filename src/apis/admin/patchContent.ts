import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { ExistingUserLogin } from "@/types/auth";
import type { ContentCreateRequest } from "@/types/content";

const patchContent = async (
  body: ContentCreateRequest
): Promise<ExistingUserLogin> => {
  const response = await axiosInstance.patch(END_POINTS.CONTENT, body, {
    isAuthRequired: true,
  });

  return response.data.content;
};

export default patchContent;
