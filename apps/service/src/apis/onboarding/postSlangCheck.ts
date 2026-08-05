import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { SlangCheckResponse } from "@lead-me/types/onBoarding";

const postSlangCheck = async (text: string): Promise<SlangCheckResponse> => {
  const response = await axiosInstance.post(
    END_POINTS.SLANG_FILTER,
    {
      text,
    },
    {
      isAuthRequired: false,
    }
  );

  return response.data.content;
};

export default postSlangCheck;
