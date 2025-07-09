import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    isAuthRequired?: boolean;
  }
}
