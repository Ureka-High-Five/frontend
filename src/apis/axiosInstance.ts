import axios from "axios";
import {
  setAuthorizedRequest,
  handleTokenError,
} from "@/apis/axiosInterceptors";
import { BASE_URL, NETWORK_TIMEOUT } from "@/constants/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  withCredentials: true,
  authRequired: true,
});

axiosInstance.interceptors.request.use(setAuthorizedRequest);

axiosInstance.interceptors.response.use(
  (response) => response,
  handleTokenError
);
