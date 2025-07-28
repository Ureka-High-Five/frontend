import { useEffect, useState } from "react";
import type { CommentWithTime } from "@/types/shorts";

export const useTemporaryUserComment = (
  initialComment: CommentWithTime | null | undefined
) => {
  const [localComment, setLocalComment] = useState<CommentWithTime | null>(
    null
  );

  const visibleComment = localComment ?? initialComment;

  useEffect(() => {
    if (localComment) {
      const timer = setTimeout(() => setLocalComment(null), 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [localComment]);

  return {
    visibleComment,
    setLocalComment,
  };
};
