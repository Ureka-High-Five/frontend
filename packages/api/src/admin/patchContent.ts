import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { ExistingUserLogin } from "@lead-me/types/auth";
import type { ContentCreateRequest } from "@lead-me/types/content";

const patchContent = async (
  body: ContentCreateRequest
): Promise<ExistingUserLogin> => {
  const response = await axiosInstance.patch(END_POINTS.CONTENT, body);

  return response.data.content;
};

export default patchContent;
