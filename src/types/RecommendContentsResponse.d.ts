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
  recommendContents: RecommendContent[];
  recommendGenreContents: RecommendGenreContent;
  recommendSecondGenreContents: RecommendGenreContent;
  recommendCuration: RecommendCuration;
  recommendSecondCuration: RecommendCuration;
}
