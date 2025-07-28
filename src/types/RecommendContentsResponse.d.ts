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
  curationId: number;
  userId: number;
  userName: string;
  title: string;
  profileUrl: string;
  contents: RecommendContent[];
}

export interface RecommendContentsResponse {
  mainRecommend: MainRecommend;
  personalRecommends: RecommendContent[];
  genre: Record<string, RecommendContent[]>;
  curation: RecommendCuration[];
}
