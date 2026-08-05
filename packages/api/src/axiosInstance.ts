import axios from "axios";
import {
  setAuthorizedRequest,
  handleTokenError,
  handleAPIError,
} from "@lead-me/api/axiosInterceptors";
import { BASE_URL, NETWORK_TIMEOUT } from "@lead-me/api/constants";

declare module "axios" {
  export interface AxiosRequestConfig {
    isAuthRequired?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  withCredentials: true,
  isAuthRequired: true,
});

axiosInstance.interceptors.request.use(setAuthorizedRequest, handleAPIError);

axiosInstance.interceptors.response.use(
  (response) => response,
  handleTokenError
);

axiosInstance.interceptors.response.use((response) => response, handleAPIError);
