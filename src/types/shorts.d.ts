export interface ShortsItem {
  contentId: string;
  contentTitle: string;
  shortsId: string;
  shortsUrl: string;
  liked: boolean;
  shortThumbnail?: string;
}

export interface GetShortsResponse {
  nextCursor?: number;
  hasNext: boolean;
  items: ShortsItem[];
}
