import { axiosInstance } from "@/apis/axiosInstance";
import { END_POINTS } from "@/constants/api";

interface PostContentClickParams {
  contentId: number;
}

const postContentClick = async ({ contentId }: PostContentClickParams) => {
  const response = await axiosInstance.post(END_POINTS.CONTENT_CLICK, {
    contentId,
  });

  return response.data;
};

export default postContentClick;
