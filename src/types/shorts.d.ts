export type VideoType = "VIDEO" | "SHORTS";

export interface ShortsItem {
  shortsId: number;
  shortsUrl: string;
  shortsThumbnail: string;
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
  liked: boolean;
}

export interface Comment {
  comment: string;
  userName: string;
  profileUrl: string;
  userId: number;
  createdAt?: string;
  commentId: number;
}

export interface GetAllCommentsResponse {
  nextCursor?: number | null;
  hasNext: boolean;
  items: Comment[];
}

export interface CommentWithTime extends Comment {
  time: number;
}

export interface ShortsDuration {
  shortsId: number;
  duration: string;
}

interface ShortsTimeLine {
  shortsId: number;
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

export interface WatchLogRequest {
  id: number;
  watchTime: number;
  type: VideoType;
}
