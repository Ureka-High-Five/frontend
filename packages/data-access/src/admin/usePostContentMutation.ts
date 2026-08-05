import { postContent } from "@lead-me/api/admin/postContent";
import { useMutation } from "@tanstack/react-query";
import type { ContentCreateRequest } from "@lead-me/types/content";

export const usePostContentMutation = () => {
  const { mutate: mutatePostContent, isPending: isPosting } = useMutation({
    mutationFn: (body: ContentCreateRequest) => postContent(body),
  });

  return {
    mutatePostContent,
    isPosting,
  };
};
