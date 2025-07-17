export interface SearchContent {
  contentId: number;
  posterUrl: string;
  title: string;
  openYear: number;
}

export interface GetSearchContentsResponse {
  contents: SearchContent[];
  nextCursor: number | null;
  hasNext: boolean;
}
