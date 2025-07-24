import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

const deleteMyCuration = async (curationId: number) => {
  const response = await axiosInstance.delete(
    `${END_POINTS.CURATION}/${curationId}`
  );

  return response.data.content;
};

export default deleteMyCuration;
