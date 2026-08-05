export interface CommentData {
  code: number;
  content: {
    comment: string;
    username: string;
    profileUrl: string;
    userId: string;
  };
  message: string | null;
}
