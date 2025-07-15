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
  code: number;
  content: {
    items: Review[];
    hasNext: boolean;
    nextCursor?: string;
  };
  message: string;
}

export interface MyReview {
  rating: number;
  review: string;
}
