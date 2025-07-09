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
