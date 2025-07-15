import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import patchUserPreference from "@/apis/onboarding/patchUserPreference";
import { PATH } from "@/constants/path";

const useUserPreferenceMutation = () => {
  const navigate = useNavigate();

  const patchUserPreferenceMutation = useMutation({
    mutationFn: patchUserPreference,
    onSuccess: () => {
      navigate(PATH.HOME);
    },
  });

  return {
    mutateUserPrefernce: patchUserPreferenceMutation.mutate,
  };
};

export default useUserPreferenceMutation;
