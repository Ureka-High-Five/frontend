export type VideoType = "VIDEO" | "SHORTS";

export interface ShortsItem {
  shortsId: number;
  shortsUrl: string;
  contentId: number;
  contentTitle: string;
  liked: boolean;
  videoType: VideoType;
}

export interface GetShortsResponse {
  nextCursor?: number | null;
  hasNext: boolean;
  items: ShortsItem[];
}

export interface LikeTimeline {
  time: number; // 좋아요가 눌린 영상 시간
  count: number; // 해당 시간에 눌린 좋아요 개수
}

export interface ShortsLikeContent {
  likeTimeLines: LikeTimeline[];
}

export interface Comment {
  comment: string;
  userName: string;
  profileUrl: string;
  userId: number;
}

export interface CommentWithTime extends Comment {
  time: number;
}

export interface ShortsDuration {
  shortsId: string;
  duration: string;
}

interface ShortsTimeLine {
  shortsId: string;
  time: number;
}
export interface ShortsCommentRequest extends ShortsTimeLine {
  comment: string;
}

interface PostCommentRequest {
  shortsId: string;
  time: number;
  comment: string;
}

interface FlyingHeart {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  color: string;
}
