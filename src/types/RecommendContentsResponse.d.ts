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

type RecommendCuration = {
  curationId: number;
  userId: number;
  userName: string;
  title: string;
  thumbnailUrl: string;
  profileUrl: string;
};

export interface RecommendContentsResponse {
  mainRecommend: MainRecommend;
  personalRecommends: RecommendContent[];
  genre: Record<string, RecommendContent[]>;
  curation: RecommendCuration[];
}
