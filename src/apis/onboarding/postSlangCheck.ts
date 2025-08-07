import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { SlangCheckResponse } from "@/types/onBoarding";

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
