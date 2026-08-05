import { axiosInstance } from "@lead-me/api/axiosInstance";
import { END_POINTS } from "@lead-me/api/constants";

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
