export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const END_POINTS = {
  NEWTOKEN: "auth/reissue",
  KAKAOLOGIN: "auth/login",
  INIT_ONBOARDING: "content/init",
  RECOMMEND_ONBOARDING: "content/recommend",
  USER: "/user",
  USER_ROLE: "/user/role",
  CONTENT_DETAIL: (contentId: number) => `/content/${contentId}`,
  USER_PREFERENCE: "user/info",
  USER_NAME: (name: string) => `/user/${name}`,
  HOME_RECOMMEND: "/content/home",
  PREVIEW_VIDEO: (contentId: number) => `/content/${contentId}/video`,
  CONTENT: "content",
  CONTENT_REVIEW: "content/review",
  USER_INFORMATION: "user/me",
  CONTENT_SEARCH: "/content/search",
  SHORTS: "/shorts",
  SHORTS_LIKE: "shorts/like",
  SHORTS_DISLIKE: "shorts/dislike",
  SHORTS_COMMENT: "shorts/comment",
  MY_CURATION: "curation/me",
  CURATION: "curation",
  PRESIGNEDURL: "s3/presignedUrl",
  SHORTS_COMMENT_TIMELINE: (shortsId: number) => `/shorts/${shortsId}/comments`,
  WATCH_LOG: "content/watch-log",
  USER_REVIEW: "user/reviews",
} as const;

export const NETWORK_TIMEOUT = 30000;

export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const HTTP_STATUS_CODE = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const AUTH_ERROR_CODE = {
  EXPIRED_ACCESS_TOKEN: 40101,
  EXPIRED_REFRESH_TOKEN: 40102,
} as const;

export const HTTP_ERROR_MESSAGES = {
  404: "찾으시는 콘텐츠가 존재하지 않아요.\n주소가 정확한지 확인해 주세요.",
  500: "서버에 문제가 발생했어요.\n조금 뒤에 다시 시도해 주세요.",
  DEFAULT: (status: number) => `문제가 발생했어요. (에러 코드: ${status})`,
  UNKNOWN: "알 수 없는 오류가 발생했어요.\n앱을 다시 실행해 보시겠어요?",
} as const;

export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
