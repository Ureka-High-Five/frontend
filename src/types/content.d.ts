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
  openDate: string;
}

export interface Review {
  reviewId: number;
  userProfileUrl: string;
  userRating: number;
  userReview: string;
}

export interface MyReview {
  rating: number;
  review: string;
}

export type PreviewVideoType = "VIDEO" | "SHORTS";

export interface PreviewVideo {
  videoUrl: string;
  type: PreviewVideoType;
}