export interface MainRecommend {
  contentId: number;
  posterUrl: string;
  description: string;
  genre: string[];
}

export interface RecommendContent {
  contentId: number;
  thumbnailUrl: string;
}

export interface RecommendGenreContent {
  genre: string;
  contents: RecommendContent[];
}

export interface RecommendCuration {
  userName: string;
  userProfile: string;
  curationTitle: string;
  contents: RecommendContent[];
}

export interface RecommendContentsResponse {
  mainRecommend: MainRecommend;
  personalRecommends: RecommendContent[];
  genre: Record<string, RecommendContent[]>;
  recommendCuration: RecommendCuration;
  recommendSecondCuration: RecommendCuration;
}
