import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import patchUserPreference from "@/apis/onboarding/patchUserPreference";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/api";
import { PATH } from "@/constants/path";

const useUserPreferenceMutation = () => {
  const navigate = useNavigate();

  const patchUserPreferenceMutation = useMutation({
    mutationFn: patchUserPreference,
    onSuccess: (content) => {
      sessionStorage.setItem(ACCESS_TOKEN, content.accessToken);
      sessionStorage.setItem(REFRESH_TOKEN, content.refreshToken);

      navigate(PATH.HOME);
    },
  });

  return {
    mutateUserPreference: patchUserPreferenceMutation.mutate,
  };
};

export default useUserPreferenceMutation;
