import { ACCESS_TOKEN, REFRESH_TOKEN } from "@lead-me/api/constants";
import { queryClient } from "@lead-me/data-access/common/queryClient";

export const logoutAdmin = () => {
  sessionStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem(REFRESH_TOKEN);
  queryClient.clear();
  window.location.replace("/");
};
