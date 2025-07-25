import type { CommentWithTime } from "@/types/shorts";

export const groupCommentsByTime = (
  comments: CommentWithTime[]
): Record<number, CommentWithTime[]> => {
  const result: Record<number, CommentWithTime[]> = {};
  comments.forEach((comment) => {
    if (!result[comment.time]) {
      result[comment.time] = [];
    }
    result[comment.time].push(comment);
  });
  return result;
};
