import { useMutation } from "@tanstack/react-query";
import { postContent } from "@/apis/admin/postContent";
import type { ContentCreateRequest } from "@/types/content";

export const usePostContentMutation = () => {
  const { mutate: mutatePostContent, isPending: isPosting } = useMutation({
    mutationFn: (body: ContentCreateRequest) => postContent(body),
  });

  return {
    mutatePostContent,
    isPosting,
  };
};
