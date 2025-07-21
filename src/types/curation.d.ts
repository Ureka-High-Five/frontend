export interface Curation {
  curationId: number;
  title: string;
  thumbnailUrl: string;
}

export interface MyCurationResponse {
  items: Curation[];
  hasNext: boolean;
  nextCursor: string;
}
