import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";
import type { CurationDetailResponse } from "@lead-me/types/curation";

const getCurationDetail = async (
  curationId: number
): Promise<CurationDetailResponse> => {
  const response = await axiosInstance.get(
    `${END_POINTS.CURATION}/${curationId}`
  );

  return response.data.content;
};

export default getCurationDetail;
