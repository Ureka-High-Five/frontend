import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

interface PostMyCurationProps {
  title: string;
  contents: number[];
  description: string;
  thumbnail: string;
}

const postMyCuration = async (curationData: PostMyCurationProps) => {
  const response = await axiosInstance.post(END_POINTS.CURATION, curationData);

  return response.data.content;
};

export default postMyCuration;
