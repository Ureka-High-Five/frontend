export interface UserInformation {
  userId: number;
  userName: string;
  email: string;
  role: string;
  profileUrl: string;
}

export interface UserReview {
  id: number;
  thumbnailUrl: string;
  title: string;
  review: string;
  rating: number;
  contentId: number;
}

export interface UserReviewListResponse {
  items: UserReview[];
  hasNext: boolean;
  nextCursor?: string;
}
