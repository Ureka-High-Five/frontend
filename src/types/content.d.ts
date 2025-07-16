export interface Content {
  contentTitle: string;
  contentDescription: string;
  contentCountry: string;
  contentGenres: string[];
  contentRunningTime: number;
  contentGrade: number;
  posterUrl: string;
  actors: string[];
  director: string;
  openYear: string;
}

export interface Review {
  reviewId: number;
  userProfileUrl: string;
  userRating: number;
  userReview: string;
}

export interface ReviewListResponse {
  items: Review[];
  hasNext: boolean;
  nextCursor?: string;
}

export interface MyReview {
  rating: number;
  review: string;
}

export interface OnBoardingContent {
  contentId: number;
  thumbnailUrl: string;
  title: string;
  openYear: number;
}

export type PreviewVideoType = "VIDEO" | "SHORTS";

export interface PreviewVideo {
  videoUrl: string;
  type: PreviewVideoType;
}

export interface PostMyReviewRequest {
  contentId: string;
  rating: number;
  review?: string;
}
