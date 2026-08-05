import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

const deleteMyCuration = async (curationId: number) => {
  const response = await axiosInstance.delete(
    `${END_POINTS.CURATION}/${curationId}`
  );

  return response.data.content;
};

export default deleteMyCuration;
