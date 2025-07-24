import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";
import type { CurationDetailResponse } from "@/types/curation";

const getCurationDetail = async (
  curationId: number
): Promise<CurationDetailResponse> => {
  const response = await axiosInstance.get(
    `${END_POINTS.CURATION}/${curationId}`
  );

  return response.data.content;
};

export default getCurationDetail;
