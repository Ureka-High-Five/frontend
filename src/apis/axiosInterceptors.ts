import { ACCESS_TOKEN } from "@/constants/api";
import { PATH } from "@/constants/path";
import type { InternalAxiosRequestConfig } from "axios";

export const setAuthorizedRequest = (config: InternalAxiosRequestConfig) => {
  if (!config.authRequired || !config.headers || config.headers.Authorization)
    return config;

  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);

  if (!accessToken) {
    window.location.href = PATH.ROOT;
    throw new Error("인증 정보가 존재하지 않습니다. 다시 로그인해주세요.");
  }

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};
