import postNewToken from "@/apis/auth/postNewToken";
import { axiosInstance } from "@/apis/axiosInstance";
import { HTTPError } from "@/apis/HTTPError";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  HTTP_STATUS_CODE,
  AUTH_ERROR_CODE,
} from "@/constants/api";
import { PATH } from "@/constants/path";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

interface ErrorResponse {
  status: number;
  code?: number;
  content?: null;
  message?: string;
}

export const setAuthorizedRequest = (config: InternalAxiosRequestConfig) => {
  if (!config.authRequired || !config.headers || config.headers.Authorization) {
    return config;
  }

  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);

  if (!accessToken) {
    window.location.href = PATH.ROOT;
    throw new Error("인증 정보가 존재하지 않습니다. 다시 로그인해주세요.");
  }

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  const originalRequest = error.config;

  if (!error.response || !originalRequest) {
    throw new Error("네트워크 요청 실패 혹은 요청 객체 없음");
  }

  const { data, status } = error.response;

  if (
    status === HTTP_STATUS_CODE.UNAUTHORIZED &&
    data.code === AUTH_ERROR_CODE.EXPIRED_ACCESS_TOKEN
  ) {
    const { accessToken } = await postNewToken();
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);

    return axiosInstance(originalRequest);
  }

  if (
    status === HTTP_STATUS_CODE.UNAUTHORIZED &&
    data.code === AUTH_ERROR_CODE.EXPIRED_REFRESH_TOKEN
  ) {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);

    window.location.href = PATH.ROOT;

    throw new HTTPError(status, data.code, data.content, data.message);
  }

  throw error;
};

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) throw error;

  const { data, status } = error.response;
  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  throw new HTTPError(status, data.code, data.content, data.message);
};
