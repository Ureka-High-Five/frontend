export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const END_POINTS = {
  NEWTOKEN: "auth/reissue",
  KAKAOLOGIN: "auth/login"
  HOME_RECOMMEND: "/content/home",
  PREVIEW_VIDEO: (contentId: number) => `/content/${contentId}/video`,
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

export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
