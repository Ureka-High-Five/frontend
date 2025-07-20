export interface SearchContent {
  contentId: number;
  thumbnailUrl: string;
  title: string;
  openYear: number;
}

export interface GetSearchContentsResponse {
  items: SearchContent[];
  nextCursor: number | null;
  hasNext: boolean;
}
