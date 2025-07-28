export interface Curation {
  curationId: number;
  title: string;
  thumbnailUrl: string;
  description: string;
}

export interface MyCurationResponse {
  items: Curation[];
  hasNext: boolean;
  nextCursor: string;
}

interface CurationDetail {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface CurationDetailResponse {
  title: string;
  contents: CurationDetail[];
  thumbnailUrl: string;
  profileUrl: string;
  editorName: string;
  editorId: number;
}
